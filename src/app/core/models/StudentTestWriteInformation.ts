import { EntityBase } from "./entityBase";
import { Student } from "./student";
import { Test } from "./test";

 export interface StudentTestWriteInformation extends EntityBase {
 studentId:number;
 testID: Number;
 testName?:string;
 tts?:boolean;
 electronicReader:boolean;
 accomodation: boolean;
 testDuration?: string;
 studentExtraTime?: string;
 endDate?: Date; 
 workOffline ;
 answerScanningAvailable? : boolean;   
 studentName : string;
 grade? : number;
 subject?: string;
 //Data 
  questionPageCount?: number 
 }