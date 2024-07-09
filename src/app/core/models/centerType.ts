import { Center } from "./center";
import { EntityBase } from "./entityBase";
import { User } from "./user";

export interface CenterType extends EntityBase {
    id: number;
    description: string | null;
    centers: Center[];
    users: User[];
}