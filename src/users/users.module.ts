import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { User } from './users.entity';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [UsersService,ConfigService],
  controllers: [UsersController],
  imports: [
    
    TypeOrmModule.forFeature([User])
  ],
  exports: [UsersService]
})
export class UsersModule { }
