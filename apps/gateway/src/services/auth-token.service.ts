import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthTokenService {
  verifyToken(token: string) {
    return jwt.verify(token, 'your_jwt_secret');
  }
}
