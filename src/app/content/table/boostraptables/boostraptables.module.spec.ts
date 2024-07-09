import { BoostraptablesModule } from './boostraptables.module';

describe('BoostraptablesModule', () => {
  let boostraptablesModule: BoostraptablesModule;

  beforeEach(() => {
    boostraptablesModule = new BoostraptablesModule();
  });

  it('should create an instance', () => {
    expect(boostraptablesModule).toBeTruthy();
  });
});
