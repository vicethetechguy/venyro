
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
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

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
      ? 'The Strategic Engine is currently under high load.' 
      : (error.message || 'The Synthesis Engine encountered an error.');
    return res.status(500).json({ error: message });
  }
}

async function handleRegistrationStep(ai: any, step: number, input: any, history: any[], res: any) {
  const systemInstruction = `You are a professional On-chain Business Architect and Base Protocol Guide. 
  Your role is to guide users step-by-step through registering their business ON-CHAIN via the Base blockchain.
  - Concept: Users are deploying a business as a smart contract protocol instead of a traditional legal entity (CAC).
  - Feature: Once deployed, they get a "Strategic Order Link" to collect payments in local currencies (automatically converted/bridged).
  - Behavior: Ask one clear question at a time. Guide them through:
    1. Base Protocol Orientation.
    2. Smart Contract Metadata (Business Type/Logic).
    3. On-chain Handle (ENS/Naming).
    4. Cap-Table Architecture (Owner wallet/Shareholders).
    5. Payment Logic (Setting up the order link for local currencies).
  - Terminology: Always use "Step", never "Stage".
  - Current Step: Step ${step}.
  - Output: JSON object with 'text' (advisor response) and 'data' (extracted contract fields). At step 8 or 9, also provide 'storefront' data.`;

  const response = await withRetry(() => ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: [...history, { role: 'user', parts: [{ text: `Process On-chain Step ${step} with input: ${JSON.stringify(input)}` }] }],
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
  let prompt = `Synthesize a full strategy and storefront configuration for ${inputs.productName}. Concept: ${inputs.concept}. Previous context: ${context || 'N/A'}. Include Base blockchain implementation details and StorefrontData (heroTitle, heroSubtitle, ctaText, welcomeMessage, acceptedCurrencies[], contractAddress).`;
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
          kpis: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { label: { type: Type.STRING }, value: { type: Type.STRING }, trend: { type: Type.STRING }, description: { type: Type.STRING } }, required: ["label", "value", "trend", "description"] } },
          storefront: {
            type: Type.OBJECT,
            properties: {
              heroTitle: { type: Type.STRING },
              heroSubtitle: { type: Type.STRING },
              ctaText: { type: Type.STRING },
              welcomeMessage: { type: Type.STRING },
              acceptedCurrencies: { type: Type.ARRAY, items: { type: Type.STRING } },
              contractAddress: { type: Type.STRING }
            },
            required: ["heroTitle", "heroSubtitle", "ctaText", "welcomeMessage", "acceptedCurrencies", "contractAddress"]
          }
        },
        required: ["projections", "suggestedStreams", "checklist", "viabilityScore", "breakEvenMonth", "breakEvenDescription", "strategicPillars", "technologies", "riskMatrix", "roadmap", "summary", "kpis", "storefront"]
      }
    }
  }));
  return res.status(200).json(JSON.parse(response.text.trim()));
}

async function handleGenerateBlueprint(ai: any, inputs: any, context: string | undefined, res: any) {
  let prompt = `Act as an expert whitepaper writer. Generate a 20-section on-chain venture blueprint for: "${inputs.productName}" on Base Blockchain.`;
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
      systemInstruction: "Venyro On-chain Advisor: Professional, technical. Focus on Base ecosystem."
    }
  }));
  return res.status(200).json({ text: response.text });
}
