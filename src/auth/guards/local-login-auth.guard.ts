import { AuthGuard } from "@nestjs/passport";

export class LocalLoginAuthGuard extends AuthGuard('local-login') {}