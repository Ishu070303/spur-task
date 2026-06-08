import { randomUUID } from 'crypto';
import db from '../config/database';
import type { Message, Sender } from '../types';

export function createMessage(conversationId: string, sender: Sender, text: string): Message {
  const message: Message = {
    id: randomUUID(),
    conversationId,
    sender,
    text,
    timestamp: new Date().toISOString(),
  };
  db.prepare(
    'INSERT INTO messages (id, conversationId, sender, text, timestamp) VALUES (?, ?, ?, ?, ?)'
  ).run(message.id, message.conversationId, message.sender, message.text, message.timestamp);
  return message;
}

export function findMessagesByConversationId(conversationId: string): Message[] {
  return db
    .prepare('SELECT * FROM messages WHERE conversationId = ? ORDER BY timestamp ASC')
    .all(conversationId) as Message[];
}

export function findLastNMessages(conversationId: string, n: number): Message[] {
  return db
    .prepare('SELECT * FROM messages WHERE conversationId = ? ORDER BY timestamp DESC LIMIT ?')
    .all(conversationId, n)
    .reverse() as Message[];
}
