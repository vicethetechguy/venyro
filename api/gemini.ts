
import { GoogleGenAI, Type } from "@google/genai";

/**
 * Vercel Serverless Configuration
 * maxDuration is set to 60s to accommodate Gemini 3 Pro reasoning/thinking time.
 */
export const config = {
  maxDuration: 60,
};

export default async function handler(req: any, res: any) {
  // Security: Only allow POST requests for strategic synthesis
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { action, payload, history, context } = req.body;
  
  // Access secret key from Vercel Environment Variables
  const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.error("Venyro Backend: API_KEY is missing in environment.");
    return res.status(500).json({ error: 'Strategic Engine Key is not configured on the server.' });
  }

  // Initialize SDK only on the server
  const ai = new GoogleGenAI({ apiKey });

  try {
    switch (action) {
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
        return res.status(400).json({ error: 'Unsupported synthesis action' });
    }
  } catch (error: any) {
    console.error(`Gemini API Error [${action}]:`, error);
    return res.status(500).json({ 
      error: error.message || 'The Strategic Synthesis Engine encountered an internal error.' 
    });
  }
}

async function handleInferStrategy(ai: any, concept: string, res: any) {
  const prompt = `Act as a world-class venture architect. Based on this one-sentence concept: "${concept}", infer a 6-pillar strategy map.
  Provide a concise draft, confidence level, core assumptions, and next action for each pillar.
  Assign a venture name and Strategy Strength Score (0-100).`;

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

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
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
  });

  return res.status(200).json(JSON.parse(response.text.trim()));
}

async function handleGenerateStrategy(ai: any, inputs: any, context: string | undefined, res: any) {
  let prompt = `Act as a world-class venture architect. Generate a strategy for: ${inputs.productName}
  Style: ${inputs.brandStyle} | Vision: ${inputs.concept} | Transformation: ${inputs.transformation} | Moat: ${inputs.moat}
  Return projections, streams, viability, tech stack, risk matrix, roadmap, and KPIs.`;

  if (context) {
    prompt += `\n\nRefer to this previous synthesis context for consistency: ${context}`;
  }

  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: prompt,
    config: {
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
  });

  return res.status(200).json(JSON.parse(response.text.trim()));
}

async function handleGenerateBlueprint(ai: any, inputs: any, context: string | undefined, res: any) {
  let prompt = `Synthesize an institutional-grade Executive Whitepaper for ${inputs.productName}. 
  Context: ${inputs.concept} solving ${inputs.problem}. Moat: ${inputs.moat}.
  Format with rich Markdown.`;

  if (context) {
    prompt += `\n\nIncorporate details from this previous synthesis context: ${context}`;
  }

  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: prompt,
    config: {
      thinkingConfig: { thinkingBudget: 8000 },
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
  });

  return res.status(200).json(JSON.parse(response.text.trim()));
}

async function handleRefineBlueprint(ai: any, blueprint: any, history: any[], res: any) {
  const instruction = history[history.length - 1].parts[0].text;
  const prompt = `Refine the Strategic Whitepaper for "${blueprint.title}". 
  Instruction: "${instruction}"
  Return the updated FULL JSON object.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: history,
    config: {
      thinkingConfig: { thinkingBudget: 4000 },
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
  });

  return res.status(200).json(JSON.parse(response.text.trim()));
}

async function handleChatWithStrategy(ai: any, payload: any, history: any[], res: any) {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: history,
    config: {
      systemInstruction: "You are Venyro, a senior strategic partner. Use Markdown tables for metrics and keep responses professional."
    }
  });
  return res.status(200).json({ text: response.text });
}
