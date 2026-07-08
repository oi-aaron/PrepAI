"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { saveAnswerAction } from "@/lib/actions/interview-progress";
import { evaluateInterviewAction } from "@/lib/actions/interview";

import {
  InterviewQuestion,
  InterviewSessionWithContent,
} from "@/lib/types/interview";

interface Props {
  interview: InterviewSessionWithContent;
}

export default function InterviewPlayer({
  interview,
}: Props) {
  const router = useRouter();

  const questions: InterviewQuestion[] =
    interview.questions?.questions ?? [];

  const existingAnswers = interview.answers ?? [];

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [answer, setAnswer] = useState(
    existingAnswers.find(
      (a) => a.questionIndex === 0
    )?.answer ?? ""
  );

  const [isEvaluating, setIsEvaluating] =
    useState(false);

  const totalQuestions = questions.length;

  async function nextQuestion() {
    if (isEvaluating) return;

    await saveAnswerAction(
      interview.id,
      currentQuestion,
      answer
    );

    // Move to next question
    if (currentQuestion < totalQuestions - 1) {
      const next = currentQuestion + 1;

      setCurrentQuestion(next);

      setAnswer(
        existingAnswers.find(
          (a) => a.questionIndex === next
        )?.answer ?? ""
      );

      return;
    }

    // Last question → Evaluate interview
    setIsEvaluating(true);

    const loading = toast.loading(
      "Evaluating your interview..."
    );

    try {
      await evaluateInterviewAction(interview.id);

      toast.dismiss(loading);

      toast.success(
        "Interview evaluated successfully!"
      );

      router.push(
        `/interview/${interview.id}/report`
      );
    } catch (error) {
      setIsEvaluating(false);

      toast.dismiss(loading);

      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    }
  }

  async function previousQuestion() {
    await saveAnswerAction(
      interview.id,
      currentQuestion,
      answer
    );

    if (currentQuestion > 0) {
      const prev = currentQuestion - 1;

      setCurrentQuestion(prev);

      setAnswer(
        existingAnswers.find(
          (a) => a.questionIndex === prev
        )?.answer ?? ""
      );
    }
  }

  if (!questions.length) {
    return (
      <p className="text-center text-muted-foreground">
        No interview questions found.
      </p>
    );
  }

  return (
    <div className="space-y-8">
      {/* Progress */}
      <div>
        <h2 className="text-xl font-semibold">
          Question {currentQuestion + 1} of{" "}
          {totalQuestions}
        </h2>

        <div className="mt-3 h-2 w-full rounded-full bg-muted">
          <div
            className="h-2 rounded-full bg-primary transition-all"
            style={{
              width: `${
                ((currentQuestion + 1) /
                  totalQuestions) *
                100
              }%`,
            }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="rounded-lg border p-6">
        <h3 className="text-lg font-medium">
          {questions[currentQuestion].question}
        </h3>
      </div>

      {/* Answer */}
      <Textarea
        rows={10}
        placeholder="Type your answer here..."
        value={answer}
        onChange={(e) =>
          setAnswer(e.target.value)
        }
      />

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          disabled={currentQuestion === 0 || isEvaluating}
          onClick={previousQuestion}
        >
          Previous
        </Button>

        <Button
          onClick={nextQuestion}
          disabled={isEvaluating}
        >
          {currentQuestion === totalQuestions - 1
            ? isEvaluating
              ? "Evaluating..."
              : "Finish Interview"
            : "Next"}
        </Button>
      </div>
    </div>
  );
}