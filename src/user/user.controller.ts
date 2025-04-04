import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/response-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<UserResponseDto> 
  {
    return await this.userService.create(createUserDto);
  }

  @Get()
  findAll(): Promise<UserResponseDto[]>{
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<UserResponseDto> 
  {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
