import { EntityBase } from "./entityBase";
import { Student } from "./student";
import { Test } from "./test";

export interface StudentTestExtraTimeLinker extends EntityBase {
testId:number; 
studentIds: number[];
extraTimes:any[]; 
//public Dictionary<int, string> ExtraTimeIds { get; set; }
}