import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as dotenv from 'dotenv';
import { BaseAuthGuard } from "./base.guard";

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

@Injectable()
export class OptionalAuthGuard extends BaseAuthGuard {
    constructor (jwtService: JwtService){
        super(jwtService, 'api', true);
    }
}