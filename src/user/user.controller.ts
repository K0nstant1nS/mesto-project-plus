import {
  Get, Controller, Post, Body, Res, Req, Patch,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { UserService } from './user.service';
import { ILoginUser, IPostUser } from './user.types';

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
  postUser(@Body() body: IPostUser) {
    return this.userService.setUser(body);
  }

  @Post('signin')
  signIn(@Body() body: ILoginUser, @Res() res: Response) {
    return this.userService.login(body, res);
  }

  @Patch('me')
  patchUser(@Req() req: Request) {
    return this.userService.patchInfo(req);
  }

  @Patch('me/avatar')
  patchAvatar(@Req() req: Request) {
    return this.userService.patchInfo(req);
  }
}

export default {};
