// ============================================================
// OpenAI Service - API Client
// ============================================================

import OpenAI from 'openai';
import * as keytar from 'keytar';

const SERVICE_NAME = 'decant';
const ACCOUNT_NAME = 'openai_api_key';

let openaiClient: OpenAI | null = null;

/**
 * Get OpenAI API key from system keychain
 */
export async function getApiKey(): Promise<string | null> {
  try {
    return await keytar.getPassword(SERVICE_NAME, ACCOUNT_NAME);
  } catch (error) {
    console.error('Failed to get API key from keychain:', error);
    return null;
  }
}

/**
 * Store OpenAI API key in system keychain
 */
export async function setApiKey(apiKey: string): Promise<void> {
  try {
    await keytar.setPassword(SERVICE_NAME, ACCOUNT_NAME, apiKey);
    // Reset client to use new key
    openaiClient = null;
  } catch (error) {
    console.error('Failed to store API key in keychain:', error);
    throw new Error('Failed to store API key securely');
  }
}

/**
 * Delete OpenAI API key from system keychain
 */
export async function deleteApiKey(): Promise<boolean> {
  try {
    const result = await keytar.deletePassword(SERVICE_NAME, ACCOUNT_NAME);
    openaiClient = null;
    return result;
  } catch (error) {
    console.error('Failed to delete API key from keychain:', error);
    return false;
  }
}

/**
 * Check if API key is configured
 */
export async function hasApiKey(): Promise<boolean> {
  const key = await getApiKey();
  return key !== null && key.length > 0;
}

/**
 * Get or create OpenAI client instance
 */
export async function getOpenAIClient(): Promise<OpenAI> {
  if (openaiClient) {
    return openaiClient;
  }

  const apiKey = await getApiKey();
  if (!apiKey) {
    throw new Error('OpenAI API key not configured. Please set your API key in settings.');
  }

  openaiClient = new OpenAI({
    apiKey,
  });

  return openaiClient;
}

/**
 * Make a chat completion request with retry logic
 */
export async function chatCompletion(
  systemPrompt: string,
  userMessage: string,
  options: {
    model?: string;
    temperature?: number;
    maxTokens?: number;
    retries?: number;
  } = {}
): Promise<string> {
  const {
    model = 'gpt-4o',
    temperature = 0.3,
    maxTokens = 2000,
    retries = 3,
  } = options;

  const client = await getOpenAIClient();

  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await client.chat.completions.create({
        model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMessage },
        ],
        temperature,
        max_tokens: maxTokens,
        response_format: { type: 'json_object' },
      });

      const content = response.choices[0]?.message?.content;
      if (!content) {
        throw new Error('Empty response from OpenAI');
      }

      return content;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('Unknown error');

      // Check if it's a rate limit error
      if (error instanceof OpenAI.RateLimitError) {
        // Exponential backoff
        const delay = Math.pow(2, attempt) * 1000;
        console.warn(`Rate limited, waiting ${delay}ms before retry ${attempt}/${retries}`);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }

      // Check if it's a transient error
      if (error instanceof OpenAI.APIConnectionError) {
        const delay = Math.pow(2, attempt) * 500;
        console.warn(`Connection error, waiting ${delay}ms before retry ${attempt}/${retries}`);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }

      // For other errors, fail immediately
      throw lastError;
    }
  }

  throw lastError || new Error('Failed after all retries');
}

/**
 * Validate API key by making a minimal request
 */
export async function validateApiKey(apiKey: string): Promise<boolean> {
  try {
    const client = new OpenAI({ apiKey });

    // Make a minimal request to validate the key
    await client.models.list();
    return true;
  } catch {
    return false;
  }
}
