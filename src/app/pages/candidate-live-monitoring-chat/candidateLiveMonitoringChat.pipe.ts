// import { Pipe, PipeTransform } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import { TestChat } from 'src/app/core/models/testChat';

@Pipe({ name: 'candidateLiveMonitoringChatSort' })
export class CandidateLiveMonitoringChatPipe implements PipeTransform {
  transform(values: TestChat[], filter: string): TestChat[] {
    if (!filter || filter.length === 0) {
      return values;
    }

    if (values.length === 0) {
      return values;
    }

    return values.filter((value: TestChat) => {
      const id = value.id;
      const name = value.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
      const message = value.message.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
      const otpMessage = value.otpMessage.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
      //const dateModifed = value.dateModifed.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
      const studentId = value.studentID;
      const testId = value.testID;

      if (
        id ||
        name ||
        message ||
        otpMessage ||
        testId ||
        studentId ||
        studentId ||
        testId) {
        return value;
      }
    });
  }
}