import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import psEmail from 'validator/lib/isEmail';
import { linkRegExp } from '../utils/constants';

const userNameProps = {
  minlength: 2,
  maxlength: 30,
  default: 'Жак-Ив Кусто',
};

const userAboutProps = {
  minlength: 2,
  maxlength: 200,
  default: 'Исследователь',
};

const userAvatarProps = {
  default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  validate: {
    validator: (url: string) => linkRegExp.test(url),
    message: 'Некорректный формат ссылки на аватар',
  },
};

const userEmailProps = {
  required: true,
  unique: true,
  index: true,
  validate: {
    validator: (value: string) => psEmail(value),
    message: 'Некорректный формат email',
  },
};

const userPasswordProps = {
  type: String,
  required: true,
};

@Schema({
  versionKey: false,
})
export class User {
  @Prop(userNameProps)
    name: string;

  @Prop(userAboutProps)
    about: string;

  @Prop(userAvatarProps)
    avatar: string;

  @Prop(userEmailProps)
    email: string;

  @Prop(userPasswordProps)
    password: string;
}

export type UserDocument = HydratedDocument<User>

export const UserSchema = SchemaFactory.createForClass(User);
