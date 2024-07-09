// import { Pipe, PipeTransform } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import { CandidateLiveMonitoring } from 'src/app/core/models/candidateLiveMonitoring';

@Pipe({ name: 'candidateLiveMonitoringSort' })
export class CandidateLiveMonitoringPipe implements PipeTransform {
  transform(values: CandidateLiveMonitoring[], filter: string): CandidateLiveMonitoring[] {
    if (!filter || filter.length === 0) {
      return values;
    }

    if (values.length === 0) {
      return values;
    }

    return values.filter((value: CandidateLiveMonitoring) => {
      const id = value.id;
      const keyPress = value.keyPress.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
      const leftExamArea = value.leftExamArea.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
      const offline = value.offline.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
      const fullScreenClosed = value.fullScreenClosed.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
      const dateModifed = value.dateModifed;
      const testId = value.testId;
      const studentId = value.studentId;
      const oldStudentId = value.oldStudentId;
      const oldTestId = value.oldTestId;
      const isDeleted = value.isDeleted;

      if (
        id ||
        keyPress ||
        leftExamArea ||
        offline ||
        fullScreenClosed ||
        dateModifed ||
        testId ||
        studentId ||
        oldStudentId ||
        oldTestId ||
        isDeleted) {
        return value;
      }
    });
  }
}