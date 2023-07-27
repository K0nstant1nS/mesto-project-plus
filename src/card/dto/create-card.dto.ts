import { IsString, Length, IsUrl } from 'class-validator';

export class PostCardDto {
  @IsString()
  @Length(2, 30)
    name: string;

  @IsString()
  @IsUrl()
    link: string;
}

export default {};
