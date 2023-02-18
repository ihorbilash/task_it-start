import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalLoginStrategy extends PassportStrategy(Strategy, 'local-login') {
    constructor(
        private authService: AuthService,
    ) {
        super();
    }

    async validate(username: string, password: string): Promise<{ token: string }> {
        const token = await this.authService.login({ username, password });
        return token;
    }
}