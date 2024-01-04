import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { secretKey, validUserCredentials } from '../configs/auth';

export const login = (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (
    username === validUserCredentials.username &&
    password === validUserCredentials.password
  ) {
    const token = generateToken(validUserCredentials.userId);

    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
};

const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, secretKey, { expiresIn: '3h' });
};

export const verifyToken = (req: Request, res: Response, next: () => void) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized - No token provided' });
  }

  jwt.verify(token, secretKey, (err: any, decoded: any) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized - Invalid token' });
    }

    (req as any).user = decoded;
    next();
  });
};
