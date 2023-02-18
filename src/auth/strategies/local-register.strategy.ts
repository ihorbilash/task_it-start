import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalRegisterStrategy extends PassportStrategy(Strategy, 'local-register') {
    constructor(
        private authService: AuthService
    ) {
        super();
    }

    async validate(username: string, password: string): Promise<{ token: string }> {
        const token = await this.authService.registration({username, password});
        return  token 
    }
}