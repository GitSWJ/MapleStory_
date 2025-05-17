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
      req['user'] = null;
      return next();
    }

    try {
      const user = await this.authTokenService.verifyToken(token);
      req['user'] = user;
    } catch (err) {
      req['user'] = null;
    }

    return next();
  }
}
