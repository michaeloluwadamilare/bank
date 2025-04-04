import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Wallet } from "src/wallet/entities/wallet.entity";

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
    @Prop({ required: true })
    firstname: string

    @Prop({ required: true })
    lastname: string

    @Prop({ required: true })
    age: number

    @Prop({ required: true, unique: true })
    email: string

    @Prop({ required: true })
    phoneNumber: string

    @Prop({ required: true })
    password: string

    @Prop({ default: '' })
    pin: string

    @Prop({ required: true, enum:['user', 'admin']})
    role: string

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Wallet'})
    wallet: Wallet

    @Prop({ type: Date})
    createdAt: Date

    @Prop({ type: Date})
    updatedAt: Date
}

export const UserSchema = SchemaFactory.createForClass(User)
