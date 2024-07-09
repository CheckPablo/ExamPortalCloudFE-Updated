import { EntityBase } from "./entityBase";
import { Student } from "./student";
import { Test } from "./test";

export interface VoiceInfo extends EntityBase {
    
Id:number| null;
Name:string|null;
Culture: string|null;
Age:string|null;
Gender:string|null;
Description:string|null;
Enabled:boolean|null;

}