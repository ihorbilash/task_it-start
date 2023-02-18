import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv'
import { RoleModule } from 'src/role/role.module';
import { forwardRef } from '@nestjs/common/utils/forward-ref.util';
import { PassportModule } from '@nestjs/passport';
dotenv.config({ path: `.${process.env.NODE_ENV}.env` })

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    UsersModule,
    RoleModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET',
      signOptions: {
        expiresIn: '1h'
      }
    }),
  ],
  exports: [AuthService, JwtModule]
})
export class AuthModule { }
