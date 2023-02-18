import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { User } from './users.entity';
import { forwardRef } from '@nestjs/common/utils/forward-ref.util';
import { AuthModule } from 'src/auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [UsersService,JwtService,ConfigService],
  controllers: [UsersController],
  imports: [
    
    TypeOrmModule.forFeature([User])
  ],
  exports: [UsersService]
})
export class UsersModule { }
