import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { UsersModule } from './users/users.module';
import { RoleModule } from './role/role.module';
import config from './config/ormconfig';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';



@Module({
  controllers:[AppController],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    TypeOrmModule.forRoot(config),
    UsersModule,
    RoleModule,
    AuthModule,
    
  ],

})
export class AppModule { }

