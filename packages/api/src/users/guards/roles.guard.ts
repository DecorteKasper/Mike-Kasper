import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { UsersService } from "../users.service";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import { Role } from "../entities/user.entity";
import { ROLES_KEY } from "../decorators/role.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private readonly userService: UsersService,
    ) { }

    async canActivate(context: ExecutionContext):Promise<boolean>{
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ])

        if (!requiredRoles) throw new Error('No roles defined')

        const ctx = GqlExecutionContext.create(context)
        const { user } = ctx.getContext().req
        const { role } = await this.userService.findOneByUid(user.uid)
        
        return requiredRoles.includes(role)
        }
}

