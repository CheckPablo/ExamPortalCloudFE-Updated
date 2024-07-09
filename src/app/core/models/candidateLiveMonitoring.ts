import { EntityBase } from "./entityBase";
export interface CandidateLiveMonitoring extends EntityBase{
      id: number;
      keyPress: string;
      leftExamArea: string;
      offline: string;
      fullScreenClosed: string;
      dateModifed: Date;
      testId: number;
      studentId: number;
      oldStudentId: number;
      oldTestId: number;
      isDeleted: boolean;
}