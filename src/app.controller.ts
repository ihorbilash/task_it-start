import { Controller, Get, Render } from "@nestjs/common";
import { Roles } from "./role/roles.enum";



@Controller()
export class AppController {

    @Get()
    @Render('user-route')
    findAllUsers() {
        return { roles:Roles }
    }



}
