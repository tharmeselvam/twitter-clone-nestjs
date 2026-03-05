import { ConfigService } from "@nestjs/config";
import * as dotenv from 'dotenv';
import { DataSource } from "typeorm";
import { glob, globSync } from "fs";

dotenv.config();

const configService = new ConfigService();

const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [__dirname + '/src/entities/*.entity{.ts,.js}'],
    migrations: [__dirname + '/db/migrations/*{.ts,.js}'],
    synchronize: false,
    logging: true
});

export default AppDataSource;