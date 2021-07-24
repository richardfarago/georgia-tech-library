import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateUserDto {
  // @IsOptional()
  // @IsUUID()
  // id: string;

  @IsString()
  username: string;

  @IsString()
  password: string;
}
