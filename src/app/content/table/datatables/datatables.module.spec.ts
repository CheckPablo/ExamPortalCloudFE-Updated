import { DatatablesModule } from './datatables.module';

describe('DatatablesModule', () => {
  let datatablesModule: DatatablesModule;

  beforeEach(() => {
    datatablesModule = new DatatablesModule();
  });

  it('should create an instance', () => {
    expect(datatablesModule).toBeTruthy();
  });
});
