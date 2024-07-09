import { FormRepeaterModule } from './form-repeater.module';

describe('FormRepeaterModule', () => {
  let formRepeaterModule: FormRepeaterModule;

  beforeEach(() => {
    formRepeaterModule = new FormRepeaterModule();
  });

  it('should create an instance', () => {
    expect(formRepeaterModule).toBeTruthy();
  });
});
