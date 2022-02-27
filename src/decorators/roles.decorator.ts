import { SetMetadata } from "@nestjs/common";
import { Role } from "../enums/roles.enum";

export const hasRoles = (...hasRoles: Role[]) => SetMetadata('role', hasRoles);
