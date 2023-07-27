import { IsString, Length } from 'class-validator';

export class PatchUserDto {
  @IsString()
  @Length(2, 30)
    name: string;

  @IsString()
  @Length(2, 200)
    about: string;
}

export default {};
