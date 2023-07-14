import { Schema, model } from 'mongoose';
import { linkRegExp } from '../utils/constants';

interface ICard {
  name: string,
  link: string,
  owner: Schema.Types.ObjectId,
  likes: Schema.Types.ObjectId[],
  apdatedAt: Date
}

const cardSchema = new Schema<ICard>({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (url: string) => linkRegExp.test(url),
      message: 'Некорректный формат ссылки',
    },
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: { type: [Schema.Types.ObjectId], ref: 'user', default: [] },
}, {
  timestamps: {
    createdAt: true,
    updatedAt: false,
  },
  versionKey: false,
});

export default model<ICard>('card', cardSchema);
