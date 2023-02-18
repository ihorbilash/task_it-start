import { DataSource } from "typeorm";
import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";
import * as dotenv from 'dotenv'
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
dotenv.config({ path: `.${process.env.NODE_ENV}.env` })


 const config: TypeOrmModuleOptions = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    autoLoadEntities: true,
    synchronize: true,
    entities: ["dist/**/*.entity.js"],
    
}

export default config;

