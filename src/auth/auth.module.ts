import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv'
import { RoleModule } from 'src/role/role.module';
dotenv.config({ path: `.${process.env.NODE_ENV}.env` })

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    UsersModule,
    RoleModule,
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET',
      signOptions: {
        expiresIn: '60s'
      }
    }),
  ],
  exports: [AuthService, JwtModule]
})
export class AuthModule { }
