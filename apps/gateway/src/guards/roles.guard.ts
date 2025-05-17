import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // @Public() 여부 먼저 확인
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    // roles 메타데이터 확인
    const requiredRoles = this.reflector.getAllAndMerge<Number[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    // roles 없으면 통과
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    // 사용자 정보에서 role 검사
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    return requiredRoles.includes(user?.role);
  }
}
