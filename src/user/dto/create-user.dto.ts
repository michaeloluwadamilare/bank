import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, Matches, MinLength, isString } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    firstname: string

    @IsString()
    @IsNotEmpty()
    lastname: string
    
    @IsEmail()
    email: string

    @IsString()
    phoneNumber: string

    @IsNumber()
    age: number

    @IsString()
    @MinLength(8)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/, {
        message: 'Password is too weak',
    })
    password: string;

    @IsString()
    currency: string

    @IsString()
    @IsEnum(['admin', 'user'], { message: 'Role is invalid' })
    role: 'user' | 'admin'

}
