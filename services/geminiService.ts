import { GoogleGenAI, Type } from "@google/genai";
import { LearnerProfile, LearningPathwayData } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    pathwayTitle: { type: Type.STRING, description: "A catchy title for the entire learning path for the user." },
    summary: { type: Type.STRING, description: "A brief, encouraging summary of the generated pathway for the learner." },
    phases: {
      type: Type.ARRAY,
      description: "The learning path broken down into distinct phases.",
      items: {
        type: Type.OBJECT,
        properties: {
          phaseTitle: { type: Type.STRING, description: "Title of the phase, e.g., 'Phase 1: Foundational Skills'." },
          phaseDescription: { type: Type.STRING, description: "A short description of the goal of this phase." },
          steps: {
            type: Type.ARRAY,
            description: "A list of steps within this phase.",
            items: {
              type: Type.OBJECT,
              properties: {
                stepType: { type: Type.STRING, description: "Type of learning activity. Must be one of: 'Course', 'Micro-credential', 'Certification', 'On-the-Job Training', 'Project', 'Assessment'." },
                title: { type: Type.STRING, description: "Title of the course, certification, or activity." },
                description: { type: Type.STRING, description: "Brief description of what the step entails and its importance." },
                nsqfLevel: { type: Type.STRING, description: "Suggested NSQF Level for this step, e.g., 'Level 4'. Use 'N/A' if not applicable." },
                duration: { type: Type.STRING, description: "Estimated duration to complete the step, e.g., '4 weeks', '3 months'." }
              }
            }
          }
        }
      }
    }
  }
};

export const generateLearningPath = async (profile: LearnerProfile): Promise<LearningPathwayData> => {
  const systemInstruction = `You are an expert AI solutions architect for India's vocational skilling ecosystem. Your role is to generate a personalized, adaptive learning path based on a learner's profile.
    - All recommendations must be relevant to the Indian context and aligned with NSQF/NCVET frameworks.
    - The pathway must be structured, multi-phased, and actionable, progressing from foundational to practical skills.
    - Mention specific NSQF levels where appropriate.
    - Recommendations should reflect current labor market demands in India.
    - You must provide the output ONLY in the specified JSON format and ensure all fields in the schema are present.`;

  const prompt = `
    Generate a personalized vocational skilling pathway for the following learner:
    - Name: ${profile.name}
    - Location (State): ${profile.location}
    - Education: ${profile.education}
    - Prior Skills: ${profile.skills}
    - Career Aspiration: ${profile.aspiration}
    - Preferred Language for Learning: ${profile.language}
    
    The pathway should be detailed, actionable, and broken down into logical phases (e.g., Foundation, Specialization, Practical Application). For each step, provide a type, title, description, suggested NSQF level, and estimated duration.
  `;
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.7,
      },
    });

    const jsonText = response.text.trim();
    return JSON.parse(jsonText) as LearningPathwayData;
  } catch (error) {
    console.error("Error generating content from Gemini API:", error);
    throw new Error("Failed to generate learning path from AI service.");
  }
};