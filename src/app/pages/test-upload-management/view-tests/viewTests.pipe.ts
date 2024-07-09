// import { Pipe, PipeTransform } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import { Test } from 'src/app/core/models/test';

@Pipe({ name: 'viewTestsSort' })
export class ViewTestsPipe implements PipeTransform {
  transform(values: Test[], filter: string): Test[] {
    if (!filter || filter.length === 0) {
      return values;
    }

    if (values.length === 0) {
      return values;
    }

    return values.filter((value: Test) => {
      const testCode =
        value.sector.code.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
        const TestSubject =
        value.subject.description.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
        const testName =
        value.testName.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
        const testType =
        value.testType.description.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
        const testExamDate =
        value.examDate;

      if (testCode || TestSubject||testName||testType|| testExamDate) {
        return value;
      }
    });
  }
}