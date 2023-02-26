import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv'
import { RoleModule } from 'src/role/role.module';
import { LocalStrategy } from './strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
dotenv.config({ path: `.${process.env.NODE_ENV}.env` })

@Module({
  providers: [AuthService,LocalStrategy],
  controllers: [AuthController],
  imports: [
   forwardRef(()=>UsersModule),
    RoleModule,
    PassportModule,
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
