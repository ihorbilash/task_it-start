import { Controller, Get, Render } from "@nestjs/common";



@Controller()
//@UseGuards(JwtAuthGuard)
export class AppController {

    /* @Post('create')
 async create(@Body() createUserDto:CreateUserDto) {
     console.log(' create user==>', createUserDto.login,"  ", createUserDto.password)
     await this.userService.create(createUserDto);
     return {ok:true}
 }*/

    @Get()
    @Render('user-route')
    findAllUsers() {
        return { ok: true }
    }



}
