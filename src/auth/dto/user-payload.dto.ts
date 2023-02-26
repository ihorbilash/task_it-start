import { Role } from "src/role/role.entity"

export class UserPayload {
    login: string
    hash_password:string
    role: Role
}