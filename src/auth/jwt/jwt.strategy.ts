import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { jwtConstants } from "./constants";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret
        });
    }

    async validate(payload: any) {
        console.log(payload);
        return {
            id: payload.id,
            name: payload.name,
            last_name: payload.last_name,
            email: payload.email,
            avatar: payload.avatar,
            role: payload.role
        };
    }
}
