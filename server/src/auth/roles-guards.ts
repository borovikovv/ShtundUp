import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { ROLE_KEY } from "./roles-auth.decorator";

@Injectable()
export class RoleGuards implements CanActivate {
    constructor(private jwtService: JwtService, 
        private reflector: Reflector){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        try {
            const requireRole = this.reflector.getAllAndOverride(ROLE_KEY, [
                context.getHandler(),
                context.getClass()
            ]);

            if(!requireRole) {
                return true;
            }

            const req = context.switchToHttp().getRequest();
            const authHeader = req.headers.authorization;
            const bearer = authHeader.split(" ")[0];
            const token = authHeader.split(" ")[1];

            if(bearer !== "Bearer" || !token) {
                throw new UnauthorizedException({message: "User unautorized"});
            }

            const user = this.jwtService.verify(token);
            req.user = user;

            return requireRole.includes(user.role)

        } catch(e) {
            console.log(e);
            throw new UnauthorizedException({message: "Do not access"});
        }
    }

}