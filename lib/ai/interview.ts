import { gemini } from "./gemini";
import { INTERVIEW_PROMPT } from "./prompts";

export async function generateInterviewQuestions(
  company: string,
  role: string,
  type: string,
  difficulty: string,
  resumeText: string
) {
  const prompt = `
${INTERVIEW_PROMPT}

Company:
${company}

Role:
${role}

Interview Type:
${type}

Difficulty:
${difficulty}

Candidate Resume:

${resumeText}
`;

let response;

try {
  response = await gemini.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
} catch (error) {
  console.error("Gemini Error:", error);

  throw new Error(
    "The AI service is temporarily busy. Please try again in a minute."
  );
}

  const text = response.text?.trim();

  if (!text) {
    throw new Error("Gemini returned an empty response.");
  }

  try {
    return JSON.parse(text);
  } catch {
    console.error(text);

    throw new Error("Gemini returned invalid JSON.");
  }
}