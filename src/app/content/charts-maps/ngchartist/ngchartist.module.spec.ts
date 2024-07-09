import { NgchartistModule } from './ngchartist.module';

describe('NgchartistModule', () => {
  let ngchartistModule: NgchartistModule;

  beforeEach(() => {
    ngchartistModule = new NgchartistModule();
  });

  it('should create an instance', () => {
    expect(ngchartistModule).toBeTruthy();
  });
});
