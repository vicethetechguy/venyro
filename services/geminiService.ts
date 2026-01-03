import { GoogleGenAI, Type } from "@google/genai";
import { StrategyInputs, StrategyResult, BlueprintResult, StrategyMapData } from "../types";

/**
 * GeminiService handles all interactions with the Google GenAI SDK.
 * Note: process.env.API_KEY is polyfilled by vite.config.ts for browser compatibility.
 */
export class GeminiService {
  private getClient() {
    // The Google GenAI SDK initialization MUST use process.env.API_KEY.
    // This is enabled on Vercel via the 'define' polyfill in vite.config.ts.
    const apiKey = process.env.API_KEY;
    
    if (!apiKey) {
      console.error("Venyro: API_KEY is not defined in environment variables.");
      // We return the instance anyway to satisfy types, but calls will fail until key is provided
    }

    return new GoogleGenAI({ apiKey: apiKey as string });
  }

  async inferStrategy(concept: string): Promise<StrategyMapData> {
    const ai = this.getClient();
    const prompt = `Act as a world-class venture architect. Based on this one-sentence concept: "${concept}", infer a 6-pillar strategy map.
    
    For each pillar (Vision, Value Proposition, Market, Technology, Revenue Model, Go-To-Market):
    1. Provide a concise draft (max 3 sentences).
    2. Assign a confidence level (Low, Medium, High).
    3. Identify 1-2 core assumptions.
    4. Suggest the single most important refinement action.
    
    Also:
    - Suggest a professional and punchy venture name.
    - Calculate a Strategy Strength Score (0-100) based on the initial clarity.`;

    const pillarSchema = {
      type: Type.OBJECT,
      properties: {
        draft: { type: Type.STRING },
        confidence: { type: Type.STRING, description: "Low, Medium, or High" },
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

    try {
      const text = response.text;
      if (!text) throw new Error("Empty response from AI");
      return JSON.parse(text.trim()) as StrategyMapData;
    } catch (error) {
      console.error("Failed to parse inference response", error);
      throw new Error("Strategy inference failed.");
    }
  }

  async generateStrategy(inputs: StrategyInputs): Promise<StrategyResult> {
    const ai = this.getClient();
    const prompt = `Act as a world-class venture architect. Generate a comprehensive business strategy for: ${inputs.productName}
    Brand Style: ${inputs.brandStyle || 'Professional'}
    Based on the refined concept: ${inputs.concept}
    Problem Area: ${inputs.problem}
    The Transformation: ${inputs.transformation}
    The Defensive Moat: ${inputs.moat}
    Current Revenue Goals: ${inputs.revenueGoal}
    
    The strategy should reflect the ${inputs.brandStyle} persona in its tone and approach.
    Provide realistic projections, streams, viability, pillars, technology stack, risk matrix, roadmap, and KPIs.`;

    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            projections: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  label: { type: Type.STRING },
                  value: { type: Type.NUMBER }
                },
                required: ["label", "value"]
              }
            },
            suggestedStreams: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  tag: { type: Type.STRING },
                  description: { type: Type.STRING },
                  icon: { type: Type.STRING }
                },
                required: ["title", "tag", "description", "icon"]
              }
            },
            checklist: { type: Type.ARRAY, items: { type: Type.STRING } },
            viabilityScore: { type: Type.NUMBER },
            breakEvenMonth: { type: Type.STRING },
            breakEvenDescription: { type: Type.STRING },
            strategicPillars: {
              type: Type.OBJECT,
              properties: {
                valueProposition: { type: Type.ARRAY, items: { type: Type.STRING } },
                targetSegments: { type: Type.ARRAY, items: { type: Type.STRING } }
              },
              required: ["valueProposition", "targetSegments"]
            },
            technologies: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  category: { type: Type.STRING },
                  tech: { type: Type.ARRAY, items: { type: Type.STRING } }
                },
                required: ["category", "tech"]
              }
            },
            riskMatrix: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  level: { type: Type.STRING },
                  title: { type: Type.STRING },
                  description: { type: Type.STRING }
                },
                required: ["level", "title", "description"]
              }
            },
            roadmap: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  timeline: { type: Type.STRING },
                  title: { type: Type.STRING },
                  description: { type: Type.STRING }
                },
                required: ["timeline", "title", "description"]
              }
            },
            summary: { type: Type.STRING },
            kpis: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  label: { type: Type.STRING },
                  value: { type: Type.STRING },
                  trend: { type: Type.STRING },
                  description: { type: Type.STRING }
                },
                required: ["label", "value", "trend", "description"]
              }
            }
          },
          required: ["projections", "suggestedStreams", "checklist", "viabilityScore", "breakEvenMonth", "breakEvenDescription", "strategicPillars", "technologies", "riskMatrix", "roadmap", "summary", "kpis"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("Empty response from AI during strategy generation");
    return JSON.parse(text.trim());
  }

  async generateBlueprint(inputs: StrategyInputs): Promise<BlueprintResult> {
    const ai = this.getClient();
    const prompt = `Generate a comprehensive, investor-ready Executive Whitepaper and Business Plan for ${inputs.productName}. 
    Brand Persona: ${inputs.brandStyle || 'Professional'}
    Problem Statement: ${inputs.problem}
    The Transformation: ${inputs.transformation}
    The Competitive Moat: ${inputs.moat}
    Core Concept: ${inputs.concept}
    
    Instructions for content:
    - Use professional, high-level business language.
    - Format each section content using Markdown (paragraphs, sub-headers, and lists).
    - Ensure clear separation between ideas with multiple paragraphs.
    - Include detailed Architecture, Financial Forecasts, and Go-To-Market strategies.
    - The writing style should reflect the ${inputs.brandStyle} aesthetic.`;

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
            sections: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  content: { type: Type.STRING, description: "Detailed Markdown content with paragraphs and lists" }
                },
                required: ["title", "content"]
              }
            }
          },
          required: ["title", "sections"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("Empty response from AI during blueprint generation");
    return JSON.parse(text.trim());
  }

  async refineBlueprint(blueprint: BlueprintResult, instruction: string, history: any[]): Promise<BlueprintResult> {
    const ai = this.getClient();
    const prompt = `You are the Venture Architect refining a strategic whitepaper for "${blueprint.title}".
    
    Current Document Sections:
    ${blueprint.sections.map(s => `Section: ${s.title}\nContent: ${s.content.substring(0, 200)}...`).join('\n\n')}
    
    User Instruction: "${instruction}"
    
    Goal: Either update existing sections or add a new section based on the user's request. 
    Return the FULL updated BlueprintResult object. Maintain professional investor-grade Markdown.`;

    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: [...history, { role: 'user', parts: [{ text: prompt }] }],
      config: {
        thinkingConfig: { thinkingBudget: 4000 },
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            sections: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  content: { type: Type.STRING }
                },
                required: ["title", "content"]
              }
            }
          },
          required: ["title", "sections"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("Failed to refine blueprint.");
    return JSON.parse(text.trim());
  }

  async chatWithStrategy(strategy: StrategyResult, inputs: StrategyInputs, question: string, history: any[]): Promise<string> {
    const ai = this.getClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [...history, { role: 'user', parts: [{ text: `Question: ${question}\nContext: ${inputs.productName} strategy.` }] }],
      config: {
        systemInstruction: "You are Venyro, a senior strategic partner. Use Montserrat-compatible Markdown formatting. Be concise and sharp. Use tables for metrics."
      }
    });
    return response.text || "No response received.";
  }
}