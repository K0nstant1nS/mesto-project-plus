import mongoose from 'mongoose';
import {
  HttpException, BadRequestException, HttpStatus, ConflictException,
} from '@nestjs/common';

export default function catchError(e: Error & {code: number}) {
  if (e.code === 11000) {
    throw new ConflictException('Пользователь с таким email существует');
  }
  if (
    e instanceof mongoose.Error.DocumentNotFoundError || e instanceof mongoose.Error.CastError
  ) {
    throw new BadRequestException();
  }
  throw new HttpException('Ошибка по умолчанию', HttpStatus.INTERNAL_SERVER_ERROR);
}
