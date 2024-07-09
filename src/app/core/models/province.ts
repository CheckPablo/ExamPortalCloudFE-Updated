import { Center } from "./center";
import { EntityBase } from "./entityBase";

export interface Province extends EntityBase {
    id: number;
    province1: string;
    centers: Center[];
}