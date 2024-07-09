import { EntityBase } from "./entityBase";
import { UserRole } from "./userRole";

export interface Role extends EntityBase{
    id: number;
    roleName: string;
    roleDescription: string;
    userRoles: UserRole[];
}