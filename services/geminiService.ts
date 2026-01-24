
import { StrategyInputs, StrategyResult, BlueprintResult, StrategyMapData } from "../types";

export class GeminiService {
  private async callProxy(action: string, payload: any, history?: any, context?: string) {
    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, payload, history, context })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Strategic Engine Error' }));
        throw new Error(errorData.error || `Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (err: any) {
      console.error("Venyro Service Error:", err);
      throw err;
    }
  }

  public expandCommand(command: string, context: string): string {
    const cmd = command.toLowerCase().trim();
    const commandMap: Record<string, string> = {
      'synthesis': 'Provide detailed synthesis of:',
      'expand': 'Expand technical depth on:',
      'summary': 'Summarize key takeaways for:',
      'strategy': 'Suggest tactical pivots for:',
      'refine': 'Polishing clarity and impact for:'
    };
    const prefix = commandMap[cmd] || `Instruction: "${command}". Context:`;
    return `${prefix}\n\n[CONTEXT]\n${context}\n[/CONTEXT]`;
  }

  async inferStrategy(concept: string): Promise<StrategyMapData> {
    return this.callProxy('inferStrategy', concept);
  }

  async generateStrategy(inputs: StrategyInputs, context?: string): Promise<StrategyResult> {
    return this.callProxy('generateStrategy', inputs, undefined, context);
  }

  async generateBlueprint(inputs: StrategyInputs, context?: string): Promise<BlueprintResult> {
    return this.callProxy('generateBlueprint', inputs, undefined, context);
  }

  async refineBlueprint(blueprint: BlueprintResult, instruction: string, history: any[], previousContext?: string): Promise<BlueprintResult> {
    let context = previousContext || blueprint.sections.map(s => s.title).join(', ');
    const expandedInstruction = this.expandCommand(instruction, context);
    const fullHistory = [...history, { role: 'user', parts: [{ text: expandedInstruction }] }];
    return this.callProxy('refineBlueprint', blueprint, fullHistory, context);
  }

  async handleRegistrationStep(step: number, input: any, history: any[]): Promise<any> {
    return this.callProxy('registrationStep', { step, input }, history);
  }

  async chatWithStrategy(strategy: StrategyResult, inputs: StrategyInputs, question: string, history: any[], previousContext?: string): Promise<string> {
    let lastContext = previousContext || strategy.summary || inputs.concept;
    const expandedQuestion = this.expandCommand(question, lastContext);
    const fullHistory = [...history, { role: 'user', parts: [{ text: expandedQuestion }] }];
    const data = await this.callProxy('chatWithStrategy', {}, fullHistory, lastContext);
    return data.text || "No response received.";
  }
}
