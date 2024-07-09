import { Center } from "./center";
import { CenterType } from "./centerType";
import { UserRole } from "./userRole";
import { EntityBase } from "./entityBase";
import { Student } from "./student";
import { Test } from "./test";

export class TestChat  {
id: number;
//docu
name: string | null;
message: string | null;
testID:  number | null;
studentID:  number | null;
fromTeacher:string | null;
fromStudent: string | null;
studentReadStatus: string | null;
teacherReadStatus: string | null;
otpMessage: string | null;
createdAt:any | null; 
//createdAt
}