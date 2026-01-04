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

  /**
   * Expands short commands into full, context-aware instructions.
   * Requirement: Always include the previous response from the AI as context.
   */
  public expandCommand(command: string, context: string): string {
    const cmd = command.toLowerCase().trim();
    
    // Command mapping for specific strategic keywords
    const commandMap: Record<string, string> = {
      'synthesis': 'Please create a comprehensive synthesis and structured analysis of the following strategic content:',
      'expand': 'Please expand significantly on the following content, providing more technical depth, granular data, and market context:',
      'summary': 'Please provide a high-level executive summary of the following content, focusing on key takeaways and action items:',
      'strategy': 'Please refine the overarching strategic approach and suggest tactical improvements for the following business content:',
      'refine': 'Please refine and polish the following content, improving the professional tone, clarity, and strategic impact:'
    };

    const prefix = commandMap[cmd] || `Please process the following request: "${command}" using this content as the direct context:`;
    
    // Construct the combined prompt ensuring the AI "sees" the previous output
    return `${prefix}\n\n--- START PREVIOUS AI RESPONSE ---\n${context}\n--- END PREVIOUS AI RESPONSE ---`;
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
    // For Blueprints, the "context" is either the current full blueprint or the last model message
    let context = blueprint.sections.map(s => `Section: ${s.title}\n${s.content}`).join('\n\n');
    
    // If the instruction is a simple keyword, wrap it with context
    const expandedInstruction = this.expandCommand(instruction, context);
    
    const fullHistory = [...history, { role: 'user', parts: [{ text: expandedInstruction }] }];
    return this.callProxy('refineBlueprint', blueprint, fullHistory);
  }

  async chatWithStrategy(strategy: StrategyResult, inputs: StrategyInputs, question: string, history: any[]): Promise<string> {
    // 1. Retrieve the last response from the AI if history exists
    let lastContext = strategy.summary || inputs.concept;
    const lastModelMessage = [...history].reverse().find(m => m.role === 'model');
    if (lastModelMessage && lastModelMessage.parts && lastModelMessage.parts[0].text) {
      lastContext = lastModelMessage.parts[0].text;
    }

    // 2. Convert the command/question into a clear instruction using that last response
    const expandedQuestion = this.expandCommand(question, lastContext);
    
    // 3. Send combined instruction + history to AI
    const fullHistory = [...history, { role: 'user', parts: [{ text: expandedQuestion }] }];
    const data = await this.callProxy('chatWithStrategy', {}, fullHistory);
    return data.text || "No synthesis received from advisory engine.";
  }
}
