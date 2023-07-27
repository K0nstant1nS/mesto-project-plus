import {
  Get, Controller, Post, Body, Res, Req, Patch,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { UserService } from './user.service';
import { PostUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login.dto';
import { PatchUserDto } from './dto/patch-user.dto';
import { PatchAvatarDto } from './dto/patch-avatar.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers() {
    return this.userService.getAll();
  }

  @Get('me')
  getMe(@Req() req: Request) {
    return this.userService.getMe(req);
  }

  @Get(':userId')
  getUser(@Req() req: Request) {
    return this.userService.getUser(req);
  }

  @Post()
  postUser(@Body() body: PostUserDto) {
    return this.userService.setUser(body);
  }

  @Post('signin')
  signIn(@Body() body: LoginUserDto, @Res() res: Response) {
    return this.userService.login(body, res);
  }

  @Patch('me')
  patchUser(@Req() req: Request, @Body() body: PatchUserDto) {
    return this.userService.patchInfo(req, body);
  }

  @Patch('me/avatar')
  patchAvatar(@Req() req: Request, @Body() body: PatchAvatarDto) {
    return this.userService.patchInfo(req, body);
  }
}

export default {};
