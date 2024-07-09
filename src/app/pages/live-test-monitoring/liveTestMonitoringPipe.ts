import { Pipe, PipeTransform } from '@angular/core';
import { LiveMonitoring } from 'src/app/core/models/liveMonitoring';

@Pipe({ name: 'liveTestMonitoringSort' })
export class LiveTestMonitoringPipe implements PipeTransform {
  transform(values: LiveMonitoring[], filter: string): LiveMonitoring[] {
    if (!filter || filter.length === 0) {
      return values;
    }

    if (values.length === 0) {
      return values;
    }

    return values.filter((value: LiveMonitoring) => {
      const Name = value.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
      const Surname = value.surname.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
      const TestName = value.testName.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
      const Offline = value.offline
      const StartDate = value.startDate;
      const EndDate = value.endDate;
      const KeyPress = value.keyPress
      const LeftExamArea = value.leftExamArea;
      const Offline2 = value.offline2;
      const LastSaved = value.lastSaved;
      const FullScreenClosed = value.fullScreenClosed;
      if (
        Name ||
        Surname ||
        TestName ||
        Offline ||
        StartDate ||
        EndDate ||
        KeyPress ||
        LeftExamArea ||
        Offline2 ||
        LastSaved ||
        FullScreenClosed
      ) {
        return value;
      }
    });
  }
}