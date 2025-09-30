import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as dotenv from 'dotenv';
import { BaseAuthGuard } from "./guard/base.guard";

dotenv.config();

@Injectable()
export class AuthGuard extends BaseAuthGuard {
    constructor (jwtService: JwtService){
        super(jwtService, 'api');
    }
}

@Injectable()
export class RefreshAuthGuard extends BaseAuthGuard {
    constructor (jwtService: JwtService){
        super(jwtService, 'auth');
    }
}