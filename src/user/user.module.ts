import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { WalletModule } from 'src/wallet/wallet.module';

@Module({
  imports: [MongooseModule.forFeature([{name: User.name, schema: UserSchema}]), WalletModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
