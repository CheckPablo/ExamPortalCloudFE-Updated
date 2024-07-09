import { EntityBase } from "./entityBase";
import { Student } from "./student";
import { Test } from "./test";

export interface ScannedImagesOTP extends EntityBase{
    //id: number;
    OTP: number;
    testId: number;
    studentId: number; 

}