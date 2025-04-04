import { Injectable } from '@nestjs/common';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { Wallet } from './entities/wallet.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { WalletResponseDto } from './dto/response-wallet.dto';

@Injectable()
export class WalletService {

  constructor(
    @InjectModel(Wallet.name) private walletModel: Model<Wallet>){}
  
  async create(userId: Object, currency: string): Promise<WalletResponseDto> {
    const accountNumber =  await this.generateAccount()
    const walletDto = {
      userId,
      currency, 
      accountNumber, 
    };
    const wallet = await new this.walletModel(walletDto).save()

    return plainToInstance(
      WalletResponseDto, 
      {...wallet.toObject(), 
        balance: parseFloat(wallet.balance.toString()),
        totalCredit: parseFloat(wallet.totalCredit.toString()),
        totalDebit: parseFloat(wallet.totalDebit.toString())
      });
  }

  findAll() {
    return `This action returns all wallet`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} wallet`;
  }

  update(id: number, updateWalletDto: UpdateWalletDto) {
    return `This action updates a #${id} wallet`;
  }

  remove(id: number) {
    return `This action removes a #${id} wallet`;
  }

  async generateAccount(): Promise<string>
  {
    let isUnique = false;
    let accountNumber = '';

    while (!isUnique) {
      accountNumber = Math.floor(1000000000 + Math.random() * 9000000000).toString().padStart(10, '0');
      
      const existingAccount = await this.walletModel.findOne({ accountNumber: accountNumber });
      if (!existingAccount) {
        isUnique = true;
      }
    }

    return accountNumber;
  }
}
