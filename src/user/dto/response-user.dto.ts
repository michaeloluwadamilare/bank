import {  Exclude, Expose, Type } from 'class-transformer';
import { User } from '../entities/user.entity';
import { Wallet } from 'src/wallet/entities/wallet.entity';
import { WalletResponseDto } from 'src/wallet/dto/response-wallet.dto';

@Exclude() 
export class UserResponseDto {
    @Expose()  
    _id: string

    @Expose()
    firstname: string

    @Expose()
    lastname: string

    @Expose()
    email: string

    @Expose()
    phoneNumber: string

    @Expose()
    role: string

    @Expose()
    @Type(() => WalletResponseDto)
    wallet: WalletResponseDto;

    @Expose()
    createdAt: Date;

    @Expose()
    updatedAt: Date;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}