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
    name: string = 'Жак иф Кусто';

  @IsString()
  @Length(2, 200)
    about: string = 'Исследователь';

  @IsString()
  @IsUrl()
    avatar: string = 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png';
}

export default {};
