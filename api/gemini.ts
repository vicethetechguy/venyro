
import { GoogleGenAI, Type } from "@google/genai";

export const config = {
  maxDuration: 60,
};

async function withRetry(fn: () => Promise<any>, maxRetries = 3, initialDelay = 1000) {
  let lastError;
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error: any) {
      lastError = error;
      const statusCode = error.status || (error as any).code;
      const isRetryable = statusCode === 503 || statusCode === 429 || error.message?.toLowerCase().includes('overloaded');
      
      if (isRetryable && i < maxRetries - 1) {
        const delay = initialDelay * Math.pow(2, i);
        console.warn(`Gemini Engine overloaded. Retrying in ${delay}ms (Attempt ${i + 1}/${maxRetries})...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      throw error;
    }
  }
  throw lastError;
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { action, payload, history, context } = req.body;
  const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;

  if (!apiKey) return res.status(500).json({ error: 'Strategic Engine Key is missing.' });

  const ai = new GoogleGenAI({ apiKey });

  try {
    switch (action) {
      case 'registrationStep':
        return await handleRegistrationStep(ai, payload.step, payload.input, history, res);
      case 'inferStrategy':
        return await handleInferStrategy(ai, payload, res);
      case 'generateStrategy':
        return await handleGenerateStrategy(ai, payload, context, res);
      case 'generateBlueprint':
        return await handleGenerateBlueprint(ai, payload, context, res);
      case 'refineBlueprint':
        return await handleRefineBlueprint(ai, payload, history, res);
      case 'chatWithStrategy':
        return await handleChatWithStrategy(ai, payload, history, res);
      default:
        return res.status(400).json({ error: 'Action not supported' });
    }
  } catch (error: any) {
    console.error(`Gemini API Error [${action}]:`, error);
    const message = error.message?.toLowerCase().includes('overloaded') 
      ? 'The Strategic Engine is currently under high load. Please try again in a moment.' 
      : (error.message || 'The Synthesis Engine encountered a technical error.');
    return res.status(500).json({ error: message });
  }
}

async function handleRegistrationStep(ai: any, step: number, input: any, history: any[], res: any) {
  const systemInstruction = `You are a professional business incorporation advisor and UX guide for Nigerian businesses. 
  Your role is to guide users step-by-step through business registration (CAC).
  - Reduce confusion. Ask only one clear question at a time.
  - Adapt guidance based on user responses.
  - Tone: Human, encouraging, progress-driven, professional-gamified "founder energy".
  - Behavior: Provide micro-wins and smart assist warnings if a name or description might be rejected.
  - Current Step: Stage ${step}.
  - Output: Return a JSON object with 'text' (the advisor's response) and 'data' (any refined data or extracted fields).`;

  const response = await withRetry(() => ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: [...history, { role: 'user', parts: [{ text: `Process Step ${step} with this user input: ${JSON.stringify(input)}` }] }],
    config: {
      thinkingConfig: { thinkingBudget: 0 },
      systemInstruction,
      responseMimeType: "application/json"
    }
  }));

  return res.status(200).json(JSON.parse(response.text.trim()));
}

async function handleInferStrategy(ai: any, concept: string, res: any) {
  const prompt = `Act as a venture architect. Infer a 6-pillar strategy map for: "${concept}". Return JSON with: score (0-100), suggestedName, and pillars (vision, valueProp, market, tech, revenue, gtm). Each pillar needs: draft, confidence, assumptions[], nextAction.`;

  const pillarSchema = {
    type: Type.OBJECT,
    properties: {
      draft: { type: Type.STRING },
      confidence: { type: Type.STRING },
      assumptions: { type: Type.ARRAY, items: { type: Type.STRING } },
      nextAction: { type: Type.STRING }
    },
    required: ["draft", "confidence", "assumptions", "nextAction"]
  };

  const response = await withRetry(() => ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      thinkingConfig: { thinkingBudget: 0 },
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          score: { type: Type.NUMBER },
          suggestedName: { type: Type.STRING },
          pillars: {
            type: Type.OBJECT,
            properties: {
              vision: pillarSchema,
              valueProp: pillarSchema,
              market: pillarSchema,
              tech: pillarSchema,
              revenue: pillarSchema,
              gtm: pillarSchema
            },
            required: ["vision", "valueProp", "market", "tech", "revenue", "gtm"]
          }
        },
        required: ["score", "suggestedName", "pillars"]
      }
    }
  }));

  return res.status(200).json(JSON.parse(response.text.trim()));
}

async function handleGenerateStrategy(ai: any, inputs: any, context: string | undefined, res: any) {
  let prompt = `Synthesize a full strategy for ${inputs.productName}. Concept: ${inputs.concept}. Previous context: ${context || 'N/A'}. Return structured JSON.`;

  const response = await withRetry(() => ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      thinkingConfig: { thinkingBudget: 0 },
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          projections: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { label: { type: Type.STRING }, value: { type: Type.NUMBER } }, required: ["label", "value"] } },
          suggestedStreams: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { title: { type: Type.STRING }, tag: { type: Type.STRING }, description: { type: Type.STRING }, icon: { type: Type.STRING } }, required: ["title", "tag", "description", "icon"] } },
          checklist: { type: Type.ARRAY, items: { type: Type.STRING } },
          viabilityScore: { type: Type.NUMBER },
          breakEvenMonth: { type: Type.STRING },
          breakEvenDescription: { type: Type.STRING },
          strategicPillars: { type: Type.OBJECT, properties: { valueProposition: { type: Type.ARRAY, items: { type: Type.STRING } }, targetSegments: { type: Type.ARRAY, items: { type: Type.STRING } } }, required: ["valueProposition", "targetSegments"] },
          technologies: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { category: { type: Type.STRING }, tech: { type: Type.ARRAY, items: { type: Type.STRING } } }, required: ["category", "tech"] } },
          riskMatrix: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { level: { type: Type.STRING }, title: { type: Type.STRING }, description: { type: Type.STRING } }, required: ["level", "title", "description"] } },
          roadmap: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { timeline: { type: Type.STRING }, title: { type: Type.STRING }, description: { type: Type.STRING } }, required: ["timeline", "title", "description"] } },
          summary: { type: Type.STRING },
          kpis: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { label: { type: Type.STRING }, value: { type: Type.STRING }, trend: { type: Type.STRING }, description: { type: Type.STRING } }, required: ["label", "value", "trend", "description"] } }
        },
        required: ["projections", "suggestedStreams", "checklist", "viabilityScore", "breakEvenMonth", "breakEvenDescription", "strategicPillars", "technologies", "riskMatrix", "roadmap", "summary", "kpis"]
      }
    }
  }));

  return res.status(200).json(JSON.parse(response.text.trim()));
}

async function handleGenerateBlueprint(ai: any, inputs: any, context: string | undefined, res: any) {
  let prompt = `Act as an expert whitepaper writer and business analyst. Generate a professional, detailed, and investor-ready whitepaper for: "${inputs.productName}".
  
  CORE CONCEPT: ${inputs.concept}
  STRATEGIC CONTEXT: ${context || 'Analyze from scratch based on name and concept.'}
  
  TASK:
  Generate a comprehensive whitepaper tailored to the project type (Web3, SaaS, Hardware, etc.). The document should be institutional-grade, persuasive, and technically deep.
  
  FORMATTING RULES:
  1. Use Markdown for sections.
  2. Each section MUST be detailed and written in clear, structured paragraphs (no large blocks).
  3. Use bullet points for lists of features, metrics, or technical steps.
  4. Include markers like [Insert Diagram: Technical Flow] or [Insert Chart: Token Distribution] where relevant.
  5. The tone must be professional, authoritative, and suitable for venture capital review.

  REQUIRED STRUCTURE (20 SECTIONS):
  1. Executive Summary
  2. Problem Statement
  3. Solution Overview
  4. Platform/Business Architecture
  5. Product/Token Mechanics
  6. Validation or Traction Mechanism
  7. Investment/Monetization Model
  8. Tokenomics / Financial Model
  9. Governance / Operational Structure
  10. Roadmap
  11. Security & Compliance
  12. Market Analysis
  13. Community & Incentives
  14. Legal Considerations
  15. Technical Implementation
  16. Case Studies / Hypotheticals
  17. Revenue Model Detail
  18. Team & Advisors
  19. Risk & Challenges
  20. Appendices & Glossary

  Return as JSON with "title" and "sections" array (each with "title" and "content" fields).`;

  const response = await withRetry(() => ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      thinkingConfig: { thinkingBudget: 0 },
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          sections: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { title: { type: Type.STRING }, content: { type: Type.STRING } }, required: ["title", "content"] } }
        },
        required: ["title", "sections"]
      }
    }
  }));

  return res.status(200).json(JSON.parse(response.text.trim()));
}

async function handleRefineBlueprint(ai: any, blueprint: any, history: any[], res: any) {
  const response = await withRetry(() => ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: history,
    config: {
      thinkingConfig: { thinkingBudget: 0 },
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          sections: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { title: { type: Type.STRING }, content: { type: Type.STRING } }, required: ["title", "content"] } }
        },
        required: ["title", "sections"]
      }
    }
  }));

  return res.status(200).json(JSON.parse(response.text.trim()));
}

async function handleChatWithStrategy(ai: any, payload: any, history: any[], res: any) {
  const response = await withRetry(() => ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: history,
    config: {
      thinkingConfig: { thinkingBudget: 0 },
      systemInstruction: "Venyro Advisor: Professional, technical, concise. Use Markdown."
    }
  }));
  return res.status(200).json({ text: response.text });
}
