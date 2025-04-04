import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Decimal128, HydratedDocument } from "mongoose";
import { User } from "src/user/entities/user.entity";

export type WalletDocument = HydratedDocument<Wallet>;

@Schema({ timestamps: true })
export class Wallet {
    @Prop({ required: true, unique: true })
    accountNumber: string;

    @Prop({ 
        type: mongoose.Schema.Types.Decimal128, 
        default: () => mongoose.Types.Decimal128.fromString("0.00"),
        get: (v: Decimal128) => parseFloat(v.toString()) // Convert when accessing
    })
    balance: string;

    @Prop({ 
        type: mongoose.Schema.Types.Decimal128, 
        default: () => mongoose.Types.Decimal128.fromString("0.00"),
        get: (v: Decimal128) => parseFloat(v.toString()) // Convert when accessing
    })
    totalCredit: string;

    @Prop({ 
        type: mongoose.Schema.Types.Decimal128, 
        default: () => mongoose.Types.Decimal128.fromString("0.00"),
        get: (v: Decimal128) => parseFloat(v.toString()) // Convert when accessing
    })
    totalDebit: string;

    @Prop({ required: true, enum: ['NGN', 'USD', 'CAD'] })
    currency: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User;

    @Prop({ type: Date })
    createdAt: Date;

    @Prop({ type: Date })
    updatedAt: Date;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);
