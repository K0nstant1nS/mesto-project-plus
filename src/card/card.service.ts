import mongoose, { Model } from 'mongoose';
import { Request } from 'express';
import {
  Injectable, HttpException, NotFoundException, HttpStatus,
  BadRequestException, ForbiddenException, ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Card } from './card.schema';
import catchError from '../utils/error-catcher';
import { PostCardDto } from './dto/create-card.dto';

@Injectable()

export class CardService {
  constructor(@InjectModel(Card.name) private readonly cardModel: Model<Card>) {}

  private async checkCardOwner(req: Request) {
    const { _id } = req.user;
    const { cardId } = req.params;
    const card = await this.cardModel.findById(cardId).orFail();
    if (_id !== String(card.owner)) {
      throw new ForbiddenException();
    }
    return true;
  }

  private async configureLikeAction(req: Request, method: '$pull' | '$addToSet') {
    const { cardId } = req.params;
    try {
      const card = this.cardModel.findByIdAndUpdate(cardId, { [method]: { likes: req.user._id } }, { returnDocument: 'after' }).orFail();
      return card;
    } catch (e) {
      catchError(e);
    }
  }

  async getCards() {
    try {
      const cards = await this.cardModel.find({}).orFail().populate('likes');
      return cards;
    } catch (e) {
      catchError(e);
    }
  }

  async postCard(req: Request, body: PostCardDto) {
    const { user } = req;
    try {
      const card = await this.cardModel.create({ ...body, owner: user._id });
      return card;
    } catch (e) {
      catchError(e);
    }
  }

  async removeCard(req: Request) {
    const { cardId } = req.params;
    try {
      await this.checkCardOwner(req);
      const card = this.cardModel.findByIdAndRemove(cardId).orFail().populate('likes');
      return card;
    } catch (e) {
      catchError(e);
    }
  }

  async addLike(req: Request) {
    const method = '$addToSet';
    return this.configureLikeAction(req, method);
  }

  async removeLike(req: Request) {
    const method = '$pull';
    return this.configureLikeAction(req, method);
  }
}

export default {};
