import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';
import { WalletService } from 'src/wallet/wallet.service';
import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from './dto/response-user.dto';

@Injectable()
export class UserService {

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly walletService: WalletService
  ){}

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto>
  {
    const emailExist = await this.userModel.findOne({ email: createUserDto.email });
    if(emailExist) throw new BadRequestException('Email already exists')

    const createdUser = await new this.userModel(createUserDto).save()
    const wallet = await this.walletService.create(createdUser._id, createUserDto.currency)
    await this.userModel.findByIdAndUpdate(createdUser._id, { wallet: wallet._id });
    return plainToInstance(UserResponseDto, {...createdUser.toObject(), wallet: wallet })
  }

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.userModel
    .find()
    .populate('wallet')
    .lean()
    .exec();
    const transformedUsers = users.map(user => ({
      ...user,
      wallet: user.wallet ? {
        ...user.wallet,
        balance: parseFloat(user.wallet.balance.toString()),
        totalCredit: parseFloat(user.wallet.totalCredit.toString()),
        totalDebit: parseFloat(user.wallet.totalDebit.toString())
      } : {}
    }));

    return plainToInstance(UserResponseDto, transformedUsers, { excludeExtraneousValues: true });

  }

  async findOne(id: string): Promise<UserResponseDto> 
  {
    const user = await this.userModel.findOne({ _id: id }).populate('wallet').exec();

    if (!user) {
      throw new NotFoundException('User not found');
    }
    
    if (user.wallet) {
      user.wallet = {
        ...user.wallet,
        balance: user.wallet.balance.toString(),
        totalCredit: user.wallet.totalCredit.toString(),
        totalDebit: user.wallet.totalDebit.toString()
      };
    }
    return plainToInstance(UserResponseDto, user, { excludeExtraneousValues: true });

  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
