import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly httpService: HttpService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader) throw new UnauthorizedException('No Authorization header');

    try {
      await firstValueFrom(
        this.httpService.post('http://localhost:3001/auth/verify', {}, {
          headers: { Authorization: authHeader },
        }),
      );
      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
