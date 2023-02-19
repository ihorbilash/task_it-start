import { Controller, Get, Render } from "@nestjs/common";



@Controller()
export class AppController {

    @Get()
    @Render('user-route')
    findAllUsers() {
        return { ok: true }
    }



}
