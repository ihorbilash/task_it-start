import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './role.entity';
import { Roles } from './roles.enum';

@Injectable()
export class RoleService {

    constructor(@InjectRepository(Role) private roleRepository: Repository<Role>) { }

    async createAvalibleRoles() {
        for (const el in Roles) {
            console.log(el)
            let role = new Role();
            role.name = el;
            await this.roleRepository.save(role)
        }

    }

    async findRole(name: string) {
        let role = await this.roleRepository.findOne({ where: { name } });
        if (role === null) {
            await this.createAvalibleRoles()
        }
        return await this.roleRepository.findOne({ where: { name } });
    }

}
