import Anthropic from '@anthropic-ai/sdk';
import { env } from '../config/env';
import type { Message } from '../types';

const client = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `You are a helpful customer support agent for Nova Store, a fictional e-commerce platform.

== Nova Store Policies ==

SHIPPING:
- Domestic (India): 5-7 business days
- International: 10-14 business days
- Free shipping on all orders above ₹999

RETURNS:
- 7-day return window from delivery date
- Items must be unused and in original packaging
- Damaged or used items are not eligible for returns

SUPPORT HOURS:
- Monday to Saturday, 10:00 AM – 6:00 PM IST
- Closed on Sundays and public holidays

== Behavior Guidelines ==
- Be friendly, concise, and helpful
- Only answer questions related to Nova Store and its policies
- If a customer asks about something outside these policies, politely let them know you can only assist with Nova Store-related queries
- Never make up information not covered in the policies above`;

export async function generateReply(
  history: Message[],
  userMessage: string
): Promise<string> {
  const messages: Anthropic.MessageParam[] = history.map((msg) => ({
    role: msg.sender === 'user' ? 'user' : 'assistant',
    content: msg.text,
  }));

  messages.push({ role: 'user', content: userMessage });

  try {
    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages,
    });

    const block = response.content.find((b) => b.type === 'text');
    const text = block?.type === 'text' ? block.text : '';
    if (!text) {
      return "I'm sorry, I could not generate a response. Please try again.";
    }
    return text;
  } catch (error) {
    console.error('LLM Error:', error);
    if (error instanceof Anthropic.RateLimitError) {
      return 'We are currently experiencing high traffic. Please try again in a moment.';
    }
    if (error instanceof Anthropic.AuthenticationError) {
      return 'There is a configuration issue on our end. Please contact support.';
    }
    if (error instanceof Anthropic.APIConnectionTimeoutError) {
      return 'The request timed out. Please try again.';
    }
    return 'Something went wrong on our end. Please try again shortly.';
  }
}
