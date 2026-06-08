import * as conversationRepo from '../repositories/conversation.repository';
import * as messageRepo from '../repositories/message.repository';
import { generateReply } from './llm.service';
import type { Message, Conversation } from '../types';

const HISTORY_WINDOW = 10;

export async function processMessage(
  userText: string,
  sessionId?: string
): Promise<{ reply: string; sessionId: string }> {
  let conversation: Conversation;

  if (sessionId) {
    const existing = conversationRepo.findConversationById(sessionId);
    if (!existing) {
      conversation = conversationRepo.createConversation();
    } else {
      conversation = existing;
    }
  } else {
    conversation = conversationRepo.createConversation();
  }

  const history = messageRepo.findLastNMessages(conversation.id, HISTORY_WINDOW);

  messageRepo.createMessage(conversation.id, 'user', userText);

  const reply = await generateReply(history, userText);

  messageRepo.createMessage(conversation.id, 'assistant', reply);

  return { reply, sessionId: conversation.id };
}

export function getMessages(sessionId: string): Message[] {
  return messageRepo.findMessagesByConversationId(sessionId);
}
