import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { UsersService } from "src/users/users.service";
import { ROLES_KEY } from "./roles-decorator";

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private reflector: Reflector,
     ) {}
  
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
      const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(), 
      ]);
      if (!requiredRoles) {
        return true;
      }
      
      const request = context.switchToHttp().getRequest();
     
      return requiredRoles.some((role) => request.query.role?.includes(role));
    
  }
}