import { Schema, model } from 'mongoose';

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
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [{ type: Schema.Types.ObjectId, ref: 'user', unique: true }],
}, {
  timestamps: {
    createdAt: true,
    updatedAt: false,
  },
  versionKey: false,
});

export default model<ICard>('card', cardSchema);
