import { ChatsModule } from './chats.module';

describe('ChatModule', () => {
  let chatsModule: ChatsModule;

  beforeEach(() => {
    chatsModule = new ChatsModule();
  });

  it('should create an instance', () => {
    expect(chatsModule).toBeTruthy();
  });
});
