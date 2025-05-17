import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthTokenService } from '../services/auth-token.service';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private readonly authTokenService: AuthTokenService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'JWT 토큰이 필요합니다.' });
    }

    try {
      const user = await this.authTokenService.verifyToken(token);
      req['user'] = user;
      next();
    } catch (err) {
      return res.status(401).json({ message: '유효하지 않은 토큰입니다.' });
    }
  }
}
