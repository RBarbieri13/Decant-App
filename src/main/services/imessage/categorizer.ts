// ============================================================
// Claude AI Categorization Service
// ============================================================

import { Anthropic } from '@anthropic-ai/sdk';

interface CategorizationResult {
  url: string;
  title: string;
  description: string;
  keywords: string;
  category: string;
  subcategory: string;
  category2: string | null;
  subcategory2: string | null;
  use_case: string;
  tags: string[];
  summary: string;
}

const CATEGORIZATION_PROMPT = `You are extracting and categorizing URLs for a knowledge base system.

For each URL, extract and categorize:
1. title - Clean, descriptive title (max 100 chars)
2. description - 1-2 sentence description (max 300 chars)
3. keywords - 3-5 comma-separated keywords relevant to the content
4. category - Primary category (one of: AI Tools & Products, AI News & Announcements, AI Research & Papers, Tutorials & Learning, AI Development & Code, Demos & Showcases, Business & Finance, Food & Restaurants, Personal & Lifestyle, Work & Productivity, Other)
5. subcategory - Specific subcategory (e.g., "LLM APIs", "Italian Cuisine", "Productivity Tools")
6. category2 - Secondary category (null if not applicable)
7. subcategory2 - Secondary subcategory (null if not applicable)
8. use_case - How someone would use this resource
9. tags - Array of 3-7 relevant tags
10. summary - One-line executive summary

Respond ONLY with valid JSON array:
\`\`\`json
[
  {
    "url": "https://...",
    "title": "...",
    "description": "...",
    "keywords": "key1, key2, key3",
    "category": "...",
    "subcategory": "...",
    "category2": null,
    "subcategory2": null,
    "use_case": "...",
    "tags": ["tag1", "tag2", "tag3"],
    "summary": "..."
  }
]
\`\`\`

Do not include any text before or after the JSON.

URLs to categorize:`;

/**
 * Parse Claude response and extract JSON
 */
function parseClaudeResponse(content: string): CategorizationResult[] {
  try {
    // Try to extract JSON from code block
    let jsonStr = content;
    if (content.includes('```json')) {
      jsonStr = content.split('```json')[1].split('```')[0].trim();
    } else if (content.includes('```')) {
      jsonStr = content.split('```')[1].split('```')[0].trim();
    }

    return JSON.parse(jsonStr);
  } catch (error) {
    console.error('Failed to parse Claude response:', error);
    throw new Error(`Invalid JSON response from Claude: ${error}`);
  }
}

/**
 * Categorize a batch of URLs using Claude
 */
export async function categorizeBatch(
  items: Array<{
    url: string;
    domain: string;
    title?: string | null;
    description?: string | null;
    author?: string | null;
    [key: string]: any;
  }>,
  apiKey: string,
  batchSize: number = 10
): Promise<
  Array<{
    url: string;
    [key: string]: any;
    categorization: CategorizationResult;
  }>
> {
  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY not set');
  }

  const client = new Anthropic({ apiKey });
  const results: Array<{
    url: string;
    [key: string]: any;
    categorization: CategorizationResult;
  }> = [];

  // Process in batches
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);

    try {
      // Build prompt
      let prompt = CATEGORIZATION_PROMPT;
      for (const item of batch) {
        prompt += `\n\nURL: ${item.url}`;
        prompt += `\nDomain: ${item.domain}`;
        if (item.title) {
          prompt += `\nTitle: ${item.title}`;
        }
        if (item.description) {
          prompt += `\nDescription: ${item.description.substring(0, 300)}`;
        }
        if (item.author) {
          prompt += `\nAuthor: ${item.author}`;
        }
      }

      // Call Claude API
      const response = await client.messages.create({
        model: 'claude-opus-4-20250805',
        max_tokens: 4096,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      });

      // Extract text content
      const textContent = response.content.find((block) => block.type === 'text');
      if (!textContent || textContent.type !== 'text') {
        throw new Error('No text content in Claude response');
      }

      // Parse response
      const categorizations = parseClaudeResponse(textContent.text);

      // Match categorizations with original items
      const urlToCat = new Map(categorizations.map((cat) => [cat.url, cat]));

      for (const item of batch) {
        const categorization = urlToCat.get(item.url);
        if (categorization) {
          results.push({
            ...item,
            categorization,
          });
        } else {
          // If no categorization, use fallback
          results.push({
            ...item,
            categorization: {
              url: item.url,
              title: item.title || 'Untitled',
              description: item.description || '',
              keywords: item.domain,
              category: 'Other',
              subcategory: '',
              category2: null,
              subcategory2: null,
              use_case: '',
              tags: [item.domain],
              summary: `Resource from ${item.domain}`,
            },
          });
        }
      }
    } catch (error) {
      console.error('Error categorizing batch:', error);

      // On error, add items with fallback categorization
      for (const item of batch) {
        results.push({
          ...item,
          categorization: {
            url: item.url,
            title: item.title || 'Untitled',
            description: item.description || '',
            keywords: item.domain,
            category: 'Other',
            subcategory: '',
            category2: null,
            subcategory2: null,
            use_case: '',
            tags: [item.domain],
            summary: `Error during categorization: ${String(error).substring(0, 100)}`,
          },
        });
      }
    }
  }

  return results;
}
