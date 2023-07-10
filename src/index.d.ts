declare global {
  namespace Express { // eslint-disable-line no-unused-vars
    export interface Request {
      user: {
        _id: string
      }
    }
  }
}

export { };
