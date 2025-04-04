import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class WalletResponseDto {
    @Expose()  
    _id: string
    
    @Expose()
    accountNumber: string;

    @Expose()
    balance: string;

    @Expose()
    currency: number;

    @Expose()
    totalDebit: number;

    @Expose()
    totalCredit: number;

    @Expose()
    updatedAt: Date;

}