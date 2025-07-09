// src/auth/guards/roles.guard.ts
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "../decorators/roles.decorator";
import { RolePriority, UserRole } from "../types/user";
import { IS_PUBLIC_KEY } from "../decorators/public.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // ✅ Skip if route is marked as public
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()]
    );

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user?.role) {
      throw new ForbiddenException("Role not found in token");
    }

    // ✅ No @Roles => allow all authenticated roles
    if (!requiredRoles) return true;

    const userPriority = RolePriority[user.role];

    // Check if user meets or exceeds required role(s)
    const isAllowed = requiredRoles.some((requiredRole) => {
      return userPriority >= RolePriority[requiredRole];
    });

    if (!isAllowed) {
      throw new ForbiddenException("Access denied: You are not authorized to access this route with your current role.");
    }

    return true;
  }
}
