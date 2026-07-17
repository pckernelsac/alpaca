import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ACTOR_KEY } from '../decorators/actor.decorator';

@Injectable()
export class ActorGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const allowedActors = this.reflector.getAllAndOverride<string[]>(ACTOR_KEY, [context.getHandler(), context.getClass()]);
    // No actor restriction: allow through (public or JWT-only)
    if (!allowedActors || allowedActors.length === 0) return true;
    const { user } = context.switchToHttp().getRequest();
    // Public endpoints have no user; if we got here with no user, it's ok (public)
    if (!user) return true;
    if (!allowedActors.includes(user.type)) {
      throw new ForbiddenException('Acceso no autorizado para este tipo de usuario');
    }
    return true;
  }
}
