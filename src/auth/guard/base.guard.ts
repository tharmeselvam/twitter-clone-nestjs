import { CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as dotenv from 'dotenv';

dotenv.config()

export class BaseAuthGuard implements CanActivate {
    constructor (
        private jwtService: JwtService,
        private expectedAud: string,
        private optional: boolean = false
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

        if (!token){
            if (this.optional) return true;
            throw new UnauthorizedException;
        }

        try {
            const user = await this.jwtService.verifyAsync(token, {
                secret: process.env.JWT_SECRET,
                audience: this.expectedAud,
                issuer: 'twitter-clone-nestjs'
            });

            request['user'] = user;
            request['token'] = token;
        } catch {
            throw new UnauthorizedException;
        }

        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers['authorization']?.split(' ') ?? [];
        
        return type === 'Bearer' ? token : undefined;
    }
}