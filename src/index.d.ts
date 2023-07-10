interface IUser {
  _id: string
}

declare global {
  namespace Express { // eslint-disable-line no-unused-vars
    export interface Request {
      user: IUser
    }
  }
}

export { };
