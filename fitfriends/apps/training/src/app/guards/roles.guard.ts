
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';


const WRONG_ROLE_MESSAGE = 'Неверная роль пользователя';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const role = this.reflector.getAllAndOverride<string>('role', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (role) {

      const request = context.switchToHttp().getRequest();
      const user = request.user;

      console.log({...user});

      if (user.role !== role) {
        throw new ForbiddenException(WRONG_ROLE_MESSAGE);
      }
    }
    return true;
  }
}
