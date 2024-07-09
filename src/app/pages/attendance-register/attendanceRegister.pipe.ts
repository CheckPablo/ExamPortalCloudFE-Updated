import { Pipe, PipeTransform } from '@angular/core';
import { AttendanceRegister } from 'src/app/core/models/attendanceRegister';

@Pipe({ name: 'attendanceRegisterSort' })
export class AttendanceRegisterPipe implements PipeTransform {
  public keys: string[] = [];
  transform(values: AttendanceRegister[], filter: string): AttendanceRegister[] {
    if (!filter || filter.length === 0) {
      return values;
    }

    if (values.length === 0) {
      return values;
    }

    return values.filter((value: AttendanceRegister) => {
      const values = {};
      for (const key of this.keys) {
        if (typeof value[key] === 'string') {
          values[key] = value[key].toLowerCase().indexOf(filter.toLowerCase()) !== -1;
        }
        else if (value[key] instanceof Date) {
          values[key] = value[key].toLocaleDateString().toLowerCase().indexOf(filter.toLowerCase()) !== -1;
        } else if (value[key] instanceof Number) {
          values[key] = value[key].toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1;
        }
      }
      if (Object.values(values).some(v => v)) {
        return value;
      }
    });
  }
}