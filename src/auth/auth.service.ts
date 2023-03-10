import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { BadRequestException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt/dist';
import { RoleService } from 'src/role/role.service';
import { CreateUserDto } from 'src/users/dto/create-user';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/users.entity';
import { Roles } from 'src/role/roles.enum';
import { UserPayload } from './dto/user-payload.dto';
const SALT = 5;

@Injectable()
export class AuthService {


    constructor(private usersService: UsersService,
        private jwtService: JwtService,
        private roleService: RoleService
    ) { }


    async login(createUserDto: CreateUserDto) {
        const potential_user = await this.usersService.getUserByLogin(createUserDto.username);
        if (!potential_user) throw new BadRequestException('User is not exists');
        const isPasswordCorrect = await bcrypt.compare(createUserDto.password, potential_user.hash_password);
        if (!isPasswordCorrect) throw new BadRequestException('Password incorrect');
        const token = await this.generateToken(potential_user);
        return  token  
    }


    async registration(createUserDto: CreateUserDto) {
        const potential_user = await this.usersService.getUserByLogin(createUserDto.username);
        if (potential_user) throw new BadRequestException('User is already exists');
        const hash_password = await bcrypt.hash(createUserDto.password, SALT);
        //---------
        let new_user = new User();
        new_user.username = createUserDto.username;
        new_user.hash_password = hash_password;
        console.log('new role user=>', createUserDto.role)
        const role = await this.roleService.findRole(createUserDto.role);  
        new_user.role = role;
        //-----
        await this.usersService.create(new_user);
        return { ok: true }
    }

    async generateToken(user: User) {
        const payload:UserPayload = { login: user.username, hash_password: user.hash_password, role: user.role }
        return { token: this.jwtService.sign(payload) }
    }



}
