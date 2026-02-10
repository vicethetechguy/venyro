
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { StrategyInputs, StrategyResult, BlueprintResult, StrategyMapData } from "../types";

// Always use const ai = new GoogleGenAI({apiKey: process.env.API_KEY});
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export class GeminiService {
  private modelName = 'gemini-3-flash-preview';

  async inferStrategy(concept: string): Promise<StrategyMapData> {
    const prompt = `Act as a venture architect. Infer a 6-pillar strategy map for the following business concept: "${concept}". 
    Focus on Base L2 blockchain integration where relevant.
    Return JSON with: 
    - score (0-100)
    - suggestedName
    - pillars (vision, valueProp, market, tech, revenue, gtm). 
    Each pillar needs: draft, confidence ('Low'|'Medium'|'High'), assumptions[], nextAction.`;

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
      model: this.modelName,
      contents: [{ parts: [{ text: prompt }] }],
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

    return JSON.parse(response.text || "{}");
  }

  async analyzeDocument(fileBase64: string, mimeType: string): Promise<StrategyMapData> {
    const prompt = `You are a venture architect. Analyze the provided document and extract a 6-pillar strategy map. 
    If the document is a business plan, pitch deck, or technical spec, extract the core identity, problem, and solution.
    Return JSON with: 
    - score (0-100)
    - suggestedName
    - pillars (vision, valueProp, market, tech, revenue, gtm). 
    Each pillar needs: draft, confidence ('Low'|'Medium'|'High'), assumptions[], nextAction.`;

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
      model: this.modelName,
      contents: [{
        parts: [
          { inlineData: { data: fileBase64, mimeType: mimeType } },
          { text: prompt }
        ]
      }],
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

    return JSON.parse(response.text || "{}");
  }

  async generateStrategy(inputs: StrategyInputs, context?: string): Promise<StrategyResult> {
    const prompt = `Synthesize a full strategy and storefront configuration for ${inputs.productName}. 
    Concept: ${inputs.concept}. 
    Market: ${inputs.marketType}. 
    Problem: ${inputs.problem}.
    Transformation: ${inputs.transformation}.
    Moat: ${inputs.moat}.
    Previous Context: ${context || 'N/A'}. 
    Include Base blockchain implementation details, StorefrontData, and VaultDetails.
    VaultDetails must include: address (mock 0x...), balance (0), activeDefiProtocols (e.g. Aerodrome, Moonwell, Aave), yieldStrategy (e.g. Auto-compounding USDC).`;

    const response = await ai.models.generateContent({
      model: this.modelName,
      contents: [{ parts: [{ text: prompt }] }],
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
            },
            vault: {
              type: Type.OBJECT,
              properties: {
                address: { type: Type.STRING },
                balance: { type: Type.NUMBER },
                activeDefiProtocols: { type: Type.ARRAY, items: { type: Type.STRING } },
                yieldStrategy: { type: Type.STRING },
                lastSync: { type: Type.STRING }
              },
              required: ["address", "balance", "activeDefiProtocols", "yieldStrategy", "lastSync"]
            }
          },
          required: ["projections", "suggestedStreams", "checklist", "viabilityScore", "breakEvenMonth", "breakEvenDescription", "strategicPillars", "technologies", "riskMatrix", "roadmap", "summary", "kpis", "storefront", "vault"]
        }
      }
    });

    return JSON.parse(response.text || "{}");
  }

  async generateBlueprint(inputs: StrategyInputs, context?: string): Promise<BlueprintResult> {
    const prompt = `Act as an expert whitepaper writer. Generate a 20-section on-chain venture blueprint for: "${inputs.productName}" on Base Blockchain.
    Use the following concept details: ${inputs.concept}. 
    Ensure high technical depth and institutional tone.`;

    const response = await ai.models.generateContent({
      model: this.modelName,
      contents: [{ parts: [{ text: prompt }] }],
      config: {
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

    return JSON.parse(response.text || "{}");
  }

  async refineBlueprint(blueprint: BlueprintResult, instruction: string, history: any[], previousContext?: string): Promise<BlueprintResult> {
    const contents = history.map(h => ({
      role: h.role === 'user' ? 'user' : 'model',
      parts: h.parts
    }));

    const response = await ai.models.generateContent({
      model: this.modelName,
      contents: contents,
      config: {
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

    return JSON.parse(response.text || "{}");
  }

  async handleRegistrationStep(step: number, input: any, history: any[]): Promise<any> {
    const contents = history.map(h => ({
      role: h.role === 'model' ? 'model' : 'user',
      parts: h.parts
    }));
    
    contents.push({ role: 'user', parts: [{ text: `Process On-chain Step ${step} with input: ${JSON.stringify(input)}` }] });

    const response = await ai.models.generateContent({
      model: this.modelName,
      contents: contents,
      config: {
        systemInstruction: `You are a professional On-chain Business Architect and Base Protocol Guide. 
        Your role is to guide users step-by-step through registering their business ON-CHAIN via the Base blockchain.
        Ask one clear question at a time. Guide them through Step ${step}.
        Output JSON: { "text": "advisor response", "data": {}, "proceed": boolean }`,
        responseMimeType: "application/json"
      }
    });

    return JSON.parse(response.text || "{}");
  }

  // Updated chatWithStrategy to support 5th argument previousContext and correctly include the current question
  async chatWithStrategy(strategy: StrategyResult, inputs: StrategyInputs, question: string, history: any[], previousContext?: string): Promise<string> {
    const contents = history.map(h => ({
      role: h.role === 'model' ? 'model' : 'user',
      parts: h.parts
    }));

    // Add current question if not already in history
    contents.push({ role: 'user', parts: [{ text: question }] });

    const response = await ai.models.generateContent({
      model: this.modelName,
      contents: contents,
      config: {
        systemInstruction: "Venyro On-chain Advisor: Professional, technical. Focus on Base ecosystem. Context: " + (strategy.summary || inputs.concept) + (previousContext ? `\n\nAdditional Context: ${previousContext}` : "")
      }
    });

    return response.text || "";
  }
}
