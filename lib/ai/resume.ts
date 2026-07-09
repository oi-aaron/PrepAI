import { extractText } from "unpdf";
import { gemini } from "./gemini";
import { RESUME_ANALYSIS_PROMPT } from "./prompts";

export async function extractResumeText(
    fileUrl: string
  ): Promise<string> {
    const response = await fetch(fileUrl);
  
    if (!response.ok) {
      throw new Error("Failed to download resume.");
    }
  
    const arrayBuffer = await response.arrayBuffer();
  
    const { text } = await extractText(new Uint8Array(arrayBuffer));
  
    return Array.isArray(text) ? text.join("\n") : text;
  }

export async function analyzeResumeWithAI(resumeText: string) {
  const prompt = `
${RESUME_ANALYSIS_PROMPT}

Resume:

${resumeText}
`;

  const response = await gemini.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  const text = response.text
    ?.replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  if (!text) {
    throw new Error("Gemini returned an empty response.");
  }

  try {
    return JSON.parse(text);
  } catch {
    console.error("Invalid Gemini JSON:", text);
    throw new Error("Gemini returned invalid JSON.");
  }
}