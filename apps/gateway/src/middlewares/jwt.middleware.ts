import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization']?.replace('Bearer ', '');
    if (!token) {
      throw new UnauthorizedException('Token missing');
    }

    try {
      const decoded = jwt.verify(token, 'your_jwt_secret');
      req['user'] = decoded;
      next();
    } catch (err) {
      throw new UnauthorizedException('Token invalid');
    }
  }
}
