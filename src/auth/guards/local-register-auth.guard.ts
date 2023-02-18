import { AuthGuard } from "@nestjs/passport";

export class LocalRegisterAuthGuard extends AuthGuard('local-register') {}