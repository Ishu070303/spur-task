import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import * as chatService from '../services/chat.service';
import { findConversationById } from '../repositories/conversation.repository';

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export const sendMessageSchema = z.object({
  message: z
    .string()
    .min(1, 'Message cannot be empty')
    .transform((val) => val.slice(0, 2000)),
  sessionId: z
    .string()
    .regex(UUID_REGEX, 'Invalid sessionId format')
    .optional(),
});

export async function sendMessage(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { message, sessionId } = req.body as z.infer<typeof sendMessageSchema>;
    const result = await chatService.processMessage(message, sessionId);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

export function getMessages(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  try {
    const sessionId = req.params['sessionId'] as string;

    if (!UUID_REGEX.test(sessionId)) {
      res.status(400).json({ error: 'Invalid sessionId format' });
      return;
    }

    const conversation = findConversationById(sessionId as string);
    if (!conversation) {
      res.status(404).json({ error: 'Session not found' });
      return;
    }

    const messages = chatService.getMessages(sessionId as string);
    res.status(200).json({ sessionId, messages });
  } catch (err) {
    next(err);
  }
}
