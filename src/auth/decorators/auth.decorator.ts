import { RolesForRoute } from "src/role/roles-decorator";
import { Roles } from "src/role/roles.enum";
import { applyDecorators, } from "@nestjs/common"

export const RolesAccess = (...role: Roles[]) => {
    return applyDecorators(
        RolesForRoute(...role),
        
    );
}