import {  Controller, Get, Render, Res, Query, UseGuards } from '@nestjs/common';
import { RolesAcces } from 'src/role/roles-decorator';
import { Roles } from 'src/role/roles.enum';

import { UsersService } from './users.service';

@Controller('users')
//@UseGuards(JwtAuthGuard)
export class UsersController {

    constructor(private userService: UsersService) { }

    
    @Get('one')
    @RolesAcces(Roles.USER)
    @Render('user-in')
    async findOneUser(@Query('name') name) {
        console.log('=>',name)
      const {username,role} = await this.userService.getUserByLogin(name)
      console.log('=>',username," ", role.name)
      return {username,role}  
    }



    @Get('all')
    @RolesAcces(Roles.ADMIN)
    @Render('user-in')
    async findAllUsers(@Res() res) {
      const data = await this.userService.findAllUsers();
      console.log('=>',data)
      return {message:data}  
    }

   
}
