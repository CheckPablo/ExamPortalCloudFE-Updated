import { EntityBase } from "./entityBase";
import { Student } from "./student";
import { Test } from "./test";
export interface AttendanceRegister extends EntityBase{
      id: number;
      testName: string;
      examNo: string;
      surname: string;
      name: string;
      idNumber: string;
      trial: number;
      absent: number;
      startDate: Date;
      endDate: Date;
      modifiedDate: Date;
      password: string;
      student: Student;
      studentId: number;
      test: Test;
      testId: number;
}