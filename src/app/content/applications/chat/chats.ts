export class Chats {
  uid: string;
  senderUid: string;
  name: string;
  image: string;
  time: Date;
  showMessage: String;
  badge: String;
  showicon: boolean;
  isicon: boolean;
  isactive: boolean;
  isSelected: boolean;
  chatHistory: Array<ChatHistory>;
}

export class ChatHistory {
  date: Date;
  message: string;
  uid: string;
}
