
import { GoogleGenAI, Type } from "@google/genai";
import { Weapon, EssenceInstance } from "../types";

export const analyzeCollection = async (
  inventory: EssenceInstance[],
  weapons: Weapon[]
) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const inventoryData = inventory.map(item => ({
    primary: item.primary,
    secondary: item.secondary,
    skill: item.skill,
    qty: item.quantity
  }));
  
  const weaponsData = weapons.map(w => ({
    name: w.name,
    requiredStats: w.requiredStats
  }));

  const prompt = `You are an expert strategist for Arknights: Endfield. 
  I have a collection of essence stat combinations with quantities: ${JSON.stringify(inventoryData)}.
  The available weapons and their required stat synergies are: ${JSON.stringify(weaponsData)}.
  
  Please analyze my collection and provide:
  1. Which weapon I should prioritize targeting based on my current stacked essences.
  2. A count of unique essence types that are completely "Useless" (0 synergy with any weapon).
  3. A strategic tip for optimizing gear rolls.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            priorityWeapon: { type: Type.STRING },
            reasoning: { type: Type.STRING },
            uselessCount: { type: Type.NUMBER },
            strategicTip: { type: Type.STRING }
          },
          required: ["priorityWeapon", "reasoning", "uselessCount", "strategicTip"]
        }
      }
    });

    const text = response.text || '{}';
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return null;
  }
};
