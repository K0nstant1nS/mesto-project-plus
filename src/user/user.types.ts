export interface IPostUser{
  email: string
  password: string
  name?: string
  avatar?: string
  about?: string
}

export interface IPatchUser{
  name: string
  about: string
}

export interface IPatchAvatar{
  avatar?: string
}

export interface ILoginUser{
  email: string
  password: string
}
