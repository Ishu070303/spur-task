import { randomUUID } from 'crypto';
import db from '../config/database';
import type { Conversation } from '../types';

export function createConversation(): Conversation {
  const conversation: Conversation = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
  };
  db.prepare('INSERT INTO conversations (id, createdAt) VALUES (?, ?)').run(conversation.id, conversation.createdAt);
  return conversation;
}

export function findConversationById(id: string): Conversation | undefined {
  return db.prepare('SELECT * FROM conversations WHERE id = ?').get(id) as Conversation | undefined;
}
