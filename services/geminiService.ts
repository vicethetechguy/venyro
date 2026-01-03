
import { StrategyInputs, StrategyResult, BlueprintResult, StrategyMapData } from "../types";

/**
 * GeminiService handles strategic synthesis by communicating with 
 * the server-side API at /api/gemini.
 * 
 * SECURITY: This file DOES NOT contain API keys or direct SDK usage.
 */
export class GeminiService {
  /**
   * Universal fetcher for proxied Gemini actions.
   */
  private async callProxy(action: string, payload: any, history?: any) {
    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, payload, history })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown server error' }));
        throw new Error(errorData.error || `Strategic Engine Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (err: any) {
      console.error("Venyro Frontend Service Error:", err);
      throw err;
    }
  }

  async inferStrategy(concept: string): Promise<StrategyMapData> {
    return this.callProxy('inferStrategy', concept);
  }

  async generateStrategy(inputs: StrategyInputs): Promise<StrategyResult> {
    return this.callProxy('generateStrategy', inputs);
  }

  async generateBlueprint(inputs: StrategyInputs): Promise<BlueprintResult> {
    return this.callProxy('generateBlueprint', inputs);
  }

  async refineBlueprint(blueprint: BlueprintResult, instruction: string, history: any[]): Promise<BlueprintResult> {
    // Append the latest user instruction to the history for the server to process
    const fullHistory = [...history, { role: 'user', parts: [{ text: instruction }] }];
    return this.callProxy('refineBlueprint', blueprint, fullHistory);
  }

  async chatWithStrategy(strategy: StrategyResult, inputs: StrategyInputs, question: string, history: any[]): Promise<string> {
    const fullHistory = [...history, { role: 'user', parts: [{ text: `Topic: ${inputs.productName} strategy refinement. Question: ${question}` }] }];
    const data = await this.callProxy('chatWithStrategy', {}, fullHistory);
    return data.text || "No synthesis received from advisory engine.";
  }
}
