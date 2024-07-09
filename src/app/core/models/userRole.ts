import { Center } from "./center";
import { EntityBase } from "./entityBase";
import { Role } from "./role";
import { User } from "./user";

export interface UserRole extends EntityBase{
    id: number;
    userId: number | null;
    centerId: number | null;
    roleId: number;
    oldUserId: number | null;
    oldCenterId: number | null;
    center: Center | null;
    role: Role;
    user: User | null;
}