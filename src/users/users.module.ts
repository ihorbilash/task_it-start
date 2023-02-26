import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { User } from './users.entity';
import { ConfigService } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [UsersService,ConfigService],
  controllers: [UsersController],
  imports: [
    forwardRef(()=>AuthModule),
    TypeOrmModule.forFeature([User])
  ],
  exports: [UsersService]
})
export class UsersModule { }
