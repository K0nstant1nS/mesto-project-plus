import {
  IsString, Length, IsEmail, IsUrl,
} from 'class-validator';

export class PostUserDto {
  @IsString()
  @IsEmail()
    email: string;

  @IsString()
    password: string;

  @IsString()
  @Length(2, 30)
    name: string;

  @IsString()
  @Length(2, 200)
    about: string;

  @IsString()
  @IsUrl()
    avatar: string;
}

export default {};
