import {  Controller, Get, Render, Res, Query, UseGuards } from '@nestjs/common';
import { RoleGuard } from 'src/role/role.guard';
import { RolesAcces } from 'src/role/roles-decorator';
import { Roles } from 'src/role/roles.enum';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) { }

    
    @Get('one')
    @RolesAcces(Roles.USER)
    //@UseGuards(RoleGuard)   закоментовано бо не правильно відпрацьовує
    @Render('user-in')
    async findOneUser(@Query('name') name) {
        console.log('=>',name)
      const {username,role} = await this.userService.getUserByLogin(name)
      console.log('=>',username," ", role.name)
      return {username,role}  
    }



    @Get('all')
    @RolesAcces(Roles.ADMIN)
    //@UseGuards(RoleGuard)      закоментовано бо не правильно відпрацьовує
    @Render('admin-in')
    async findAllUsers(@Res() res) {
      const data = await this.userService.findAllUsers();
      console.log('=>',data)
      return {users:data}  
    }

   
}
