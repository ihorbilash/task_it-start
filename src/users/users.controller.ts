import { Controller, Get, Render, Res, Query, UseGuards, Post, Body } from '@nestjs/common';
import { RoleGuard } from 'src/role/role.guard';
import { RolesAcces } from 'src/role/roles-decorator';
import { Roles } from 'src/role/roles.enum';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) { }


    @Post('user')
    @RolesAcces(Roles.USER,Roles.ADMIN)
    @UseGuards(RoleGuard)
    async findOneUser(@Body() body: { username: string }) {
        const { username, role } = await this.userService.getUserByLogin(body.username)
        console.log("method post = >", username, " ", role);
        return { username, role }
    }

    @Get('user')
    @Render('user-in')
    async getUser(@Query('name') name, @Query('role') role) {
        return { name, role }

    }

    @Post('admin')
    @RolesAcces(Roles.ADMIN)
    @UseGuards(RoleGuard)
    async findAllUsers(@Body() body: { username: string, role: string }) {
        return { username: body.username, role: body.role }
    }

    @Get('admin')
    @Render('admin-in')
    async getAdmin(@Query('name') name, @Query('role') role) {
        const data = await this.userService.findAllUsers();
        return { users: data, name, role }
    }

}
