// import { Pipe, PipeTransform } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import { User } from 'src/app/core/models/user';

@Pipe({ name: 'approvalsSort' })
export class ApprovalsPipe implements PipeTransform {
  transform(values: User[], filter: string): User[] {
    if (!filter || filter.length === 0) {
      return values;
    }

    if (values.length === 0) {
      return values;
    }

    return values.filter((value: User) => {
      const centerGradeCode =
        value.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
      const centerGradeDescription =
        value.centerName.toLowerCase().indexOf(filter.toLowerCase()) !== -1;

      if (centerGradeCode || centerGradeDescription) {
        return value;
      }
    });
  }
}