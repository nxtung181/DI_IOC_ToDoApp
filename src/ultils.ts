import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express';
import { IUserAuth } from './entities/i.user.entity';

declare global {
  namespace Express {
    interface Request {
      user: IUserAuth;
    }
  }
}
export const generateAccessToken = (user: IUserAuth) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
    process.env.ACCESS_TOKEN as string,
    {
      expiresIn: '30m',
    }
  )
}

export const generateRefreshToken = (user: IUserAuth) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
    process.env.REFRESH_TOKEN as string,
    {
      expiresIn: '2d',
    }
  )
}


export const verifyRefreshToken = (token: string): IUserAuth => {
  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN as string) as IUserAuth;
    return decoded;
  } catch (error) {
    throw error;
  }
};

export const verifyAccessToken = (req: Request, res: Response, next: NextFunction): void => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN as string, (err, decode) => {
      if (err) {
        res.status(401).send({ message: err.message });
      } else {
        req.user = decode as IUserAuth;
        next();
      }
    });
  } else {
    res.status(401).send({ message: 'No Token' });
  }
};  