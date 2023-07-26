import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { User } from '../user/user.schema';
import { linkRegExp } from '../utils/constants';

const cardNameProps = {
  required: true,
  minlength: 2,
  maxlength: 30,
};

const cardLinkProps = {
  required: true,
  validate: {
    validator: (url: string) => linkRegExp.test(url),
    message: 'Некорректный формат ссылки',
  },
};

@Schema({
  timestamps: {
    createdAt: true,
    updatedAt: false,
  },
  versionKey: false,
})
export class Card {
  @Prop(cardNameProps)
    name: string;

  @Prop(cardLinkProps)
    link: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
    owner: MongooseSchema.Types.ObjectId;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'User' }], default: [] })
    likes: MongooseSchema.Types.ObjectId[];

  @Prop()
    createdAt: Date;
}

export type CardDocument = HydratedDocument<Card>;

export const CardSchema = SchemaFactory.createForClass(Card);
