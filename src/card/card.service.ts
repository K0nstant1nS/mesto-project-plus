import { Model } from 'mongoose';
import { Request } from 'express';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Card } from './card.schema';

@Injectable()

export class CardService {
  constructor(@InjectModel(Card.name) private readonly cardModel: Model<Card>) {}

  private async checkCardOwner(req: Request) {
    const { _id } = req.user;
    const { cardId } = req.params;
    const card = await this.cardModel.findById(cardId).orFail();
    return _id === String(card.owner);
  }

  private async configureLikeAction(req: Request, method: '$pull' | '$addToSet') {
    const { cardId } = req.params;
    try {
      const card = this.cardModel.findByIdAndUpdate(cardId, { [method]: { likes: req.user._id } }, { returnDocument: 'after' }).orFail();
      return card;
    } catch (e) {
      console.log(e);
    }
  }

  async getCards() {
    try {
      const cards = await this.cardModel.find({}).orFail();
      return cards;
    } catch (e) {
      console.log(e);
    }
  }

  async postCard(req: Request) {
    const { body, user } = req;
    try {
      const card = await this.cardModel.create({ ...body, owner: user._id });
      return card;
    } catch (e) {
      console.log(e);
    }
  }

  async removeCard(req: Request) {
    const { cardId } = req.params;
    try {
      if (await this.checkCardOwner(req)) {
        const card = this.cardModel.findByIdAndRemove(cardId).orFail();
        return card;
      }
      throw new Error();
    } catch (e) {
      console.log(e);
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
