import {
  Controller, Get, Post, Req, Delete, Put,
} from '@nestjs/common';
import { Request } from 'express';
import { CardService } from './card.service';

@Controller('cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Get()
  getCards() {
    return this.cardService.getCards();
  }

  @Post()
  postCard(@Req() req: Request) {
    return this.cardService.postCard(req);
  }

  @Delete(':cardId')
  deleteCard(@Req() req: Request) {
    return this.cardService.removeCard(req);
  }

  @Delete(':cardId/likes')
  deleteLike(@Req() req: Request) {
    return this.cardService.removeLike(req);
  }

  @Put(':cardId/likes')
  putLike(@Req() req: Request) {
    return this.cardService.addLike(req);
  }
}

export default {};
