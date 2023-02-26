import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { UserPayload } from "src/auth/dto/user-payload.dto";
import { UsersService } from "src/users/users.service";
import { ROLES_KEY } from "./roles-decorator";

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector,
    private jwtService: JwtService
  ) { }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    // console.log("guard = >",request.headers.authentication.split(' ')[1] );
    const token = request.headers.authentication.split(' ')[1]
    if (token) {
      let user = this.jwtService.decode(token) as UserPayload;
      request.body.username = user.login;
      request.body.role = user.role.name;
      return requiredRoles.some((role) => user.role.name?.includes(role));
    }
  }
}