import { gemini } from "./gemini";
import { INTERVIEW_EVALUATION_PROMPT } from "./prompts";

export async function evaluateInterview(
  questions: unknown,
  answers: unknown,
  resumeText: string,
  company: string,
  role: string,
  type: string,
  difficulty: string
) {
  const normalizedAnswers = Array.isArray(answers)
    ? answers.map((answer) => ({
        ...answer,
        answer:
          typeof answer.answer === "string" &&
          answer.answer.trim()
            ? answer.answer.trim()
            : "No answer provided.",
      }))
    : [];

  const prompt = `
${INTERVIEW_EVALUATION_PROMPT}

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

Interview Questions:

${JSON.stringify(questions, null, 2)}

Candidate Answers:

${JSON.stringify(normalizedAnswers, null, 2)}
`;

  let response;

  try {
    response = await gemini.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
  } catch (error: unknown) {
    console.error("Gemini Evaluation Error:", error);

    throw new Error(
      "The AI evaluation service is temporarily busy. Please try again in a minute."
    );
  }

  let text = response.text?.trim();

  if (!text) {
    throw new Error("Gemini returned an empty evaluation.");
  }

  // Remove Markdown code fences if Gemini wraps the JSON
  text = text
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/, "")
    .trim();

  try {
    return JSON.parse(text);
  } catch {
    console.error("Invalid Gemini Evaluation JSON:", text);

    throw new Error("Gemini returned invalid evaluation JSON.");
  }
}