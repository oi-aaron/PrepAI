import { gemini } from "./gemini";
import { ROADMAP_GENERATION_PROMPT } from "./prompts";
import { RoadmapContent } from "@/lib/types/roadmap";

interface GenerateRoadmapParams {
  resumeAnalysis: unknown;
  companyName: string;
  targetRole?: string;
}

export async function generateRoadmapWithAI({
  resumeAnalysis,
  companyName,
  targetRole,
}: GenerateRoadmapParams): Promise<RoadmapContent> {
  const prompt = `
${ROADMAP_GENERATION_PROMPT}

Resume Analysis:

${JSON.stringify(resumeAnalysis, null, 2)}

Target Company:
${companyName}

Target Role:
${targetRole ?? "Not specified"}
`;

  const response = await gemini.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  const text = response.text?.trim();

  if (!text) {
    throw new Error("Gemini returned an empty roadmap.");
  }

  try {
    return JSON.parse(text) as RoadmapContent;
  } catch (err) {
    console.error("Invalid Gemini Roadmap JSON:", text);
    throw new Error("Gemini returned invalid roadmap JSON.");
  }
}