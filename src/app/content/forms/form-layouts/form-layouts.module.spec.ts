import { FormLayoutsModule } from './form-layouts.module';

describe('FormLayoutsModule', () => {
  let formLayoutsModule: FormLayoutsModule;

  beforeEach(() => {
    formLayoutsModule = new FormLayoutsModule();
  });

  it('should create an instance', () => {
    expect(formLayoutsModule).toBeTruthy();
  });
});
