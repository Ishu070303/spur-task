import { Router } from 'express';
import { validate } from '../middleware/validate';
import { sendMessage, getMessages, sendMessageSchema } from '../controllers/chat.controller';

const router = Router();

router.post('/message', validate(sendMessageSchema), sendMessage);
router.get('/:sessionId/messages', getMessages);

export default router;
