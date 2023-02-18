import { Body, Controller, Get, Post, Render, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

import { CreateUserDto } from './dto/create-user';
import { UsersService } from './users.service';

@Controller('users')
//@UseGuards(JwtAuthGuard,/*RolesGuard*/)
export class UsersController {

    constructor(private userService: UsersService) { }



    @Post()
    //@UseGuards(JwtAuthGuard)
    @Render('user-in')
   async redirect(@Res() res) {
        const {message} =await this.userService.findAllUsers();
        console.log("======================================>>",message)
        res.message
       return res.redirect('users/all');
    }


    @Get('all')
    //@Render('user-in')
    async findAllUsers() {
       
        const data =await this.userService.findAllUsers();
        console.log("======================================>>",data)
        return data
    }



}
