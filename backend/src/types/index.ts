export type Sender = 'user' | 'assistant';

export interface Conversation {
  id: string;
  createdAt: string;
}

export interface Message {
  id: string;
  conversationId: string;
  sender: Sender;
  text: string;
  timestamp: string;
}
