import { CalenderModule } from './calender.module';

describe('CalenderModule', () => {
  let calenderModule: CalenderModule;

  beforeEach(() => {
    calenderModule = new CalenderModule();
  });

  it('should create an instance', () => {
    expect(calenderModule).toBeTruthy();
  });
});
