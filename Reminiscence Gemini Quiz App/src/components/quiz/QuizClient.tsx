"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { QuizQuestion, PhotoMemory } from "@/lib/quiz-data";
import QuestionCard from "./QuestionCard";
import QuizProgress from "./QuizProgress";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

interface QuizClientProps {
  questions: QuizQuestion[];
  // memories prop is not directly used here but could be for more complex logic
}

export default function QuizClient({ questions }: QuizClientProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setIsMounted(true); // Avoid hydration issues with animations/transitions
  }, []);

  const handleAnswerSelect = (optionId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questions[currentQuestionIndex].id]: optionId,
    }));
    setError(null); // Clear error when an answer is selected
  };

  const handleNextQuestion = () => {
    if (!answers[questions[currentQuestionIndex].id]) {
      setError("Please select an answer before proceeding.");
      return;
    }
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setError(null);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      setError(null);
    }
  };

  const handleSubmitQuiz = () => {
    if (!answers[questions[currentQuestionIndex].id] && questions.length > 0) {
       // Check answer for the last question as well
      setError("Please select an answer for the current question.");
      return;
    }
    // Ensure all questions are answered (optional, depends on strictness)
    // For now, allow submission if last question is answered or no questions
    if (Object.keys(answers).length < questions.length && questions.length > 0 && !answers[questions[questions.length-1].id]) {
        setError("Please ensure all questions are answered before submitting.");
        return;
    }


    const answersQueryParam = encodeURIComponent(JSON.stringify(answers));
    router.push(`/quiz/result?answers=${answersQueryParam}`);
  };

  if (!isMounted) {
    // Render a loading state or null to prevent flash of unstyled content or hydration errors
    return (
      <div className="w-full max-w-2xl text-center p-8">
        <p className="text-lg text-muted-foreground">Loading Quiz...</p>
      </div>
    );
  }
  
  if (!questions || questions.length === 0) {
    return (
      <div className="w-full max-w-2xl text-center p-8">
        <h1 className="text-3xl font-bold mb-4">Quiz Not Available</h1>
        <p className="text-lg text-muted-foreground">No questions found for this quiz. Please try again later.</p>
        <Button onClick={() => router.push('/')} className="mt-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Go Back Home
        </Button>
      </div>
    );
  }


  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  return (
    <div className="w-full max-w-2xl flex flex-col items-center p-4 md:p-0">
      <QuizProgress currentStep={currentQuestionIndex + 1} totalSteps={questions.length} />
      
      {error && (
        <Alert variant="destructive" className="mb-6 w-full animate-fadeIn">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div key={currentQuestionIndex} className="w-full animate-fadeIn mb-8">
        <QuestionCard
          question={currentQuestion}
          selectedAnswer={answers[currentQuestion.id]}
          onAnswerSelect={handleAnswerSelect}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={questions.length}
        />
      </div>

      <div className="flex justify-between w-full space-x-4">
        <Button
          variant="outline"
          onClick={handlePreviousQuestion}
          disabled={currentQuestionIndex === 0}
          className="shadow-sm"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Previous
        </Button>

        {isLastQuestion ? (
          <Button onClick={handleSubmitQuiz} className="shadow-sm bg-primary hover:bg-accent">
            Submit Quiz <CheckCircle className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button onClick={handleNextQuestion} className="shadow-sm">
            Next <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
