import { IsEmail, IsString } from 'class-validator';

export class PatchAvatarDto {
  @IsString()
  @IsEmail()
    avatar: string;
}

export default {};
