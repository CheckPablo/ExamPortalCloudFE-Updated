import { DatatablesextModule } from './datatablesext.module';

describe('DatatablesextModule', () => {
  let datatablesextModule: DatatablesextModule;

  beforeEach(() => {
    datatablesextModule = new DatatablesextModule();
  });

  it('should create an instance', () => {
    expect(datatablesextModule).toBeTruthy();
  });
});
