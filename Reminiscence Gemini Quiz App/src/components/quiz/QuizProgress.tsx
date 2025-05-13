"use client";

import { Progress } from "@/components/ui/progress";

interface QuizProgressProps {
  currentStep: number;
  totalSteps: number;
}

export default function QuizProgress({ currentStep, totalSteps }: QuizProgressProps) {
  const progressPercentage = totalSteps > 0 ? (currentStep / totalSteps) * 100 : 0;

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between text-sm text-muted-foreground mb-1">
        <span>Question {Math.min(currentStep, totalSteps)} of {totalSteps}</span>
        <span>{Math.round(progressPercentage)}%</span>
      </div>
      <Progress value={progressPercentage} aria-label={`Quiz progress: ${currentStep} of ${totalSteps} questions completed`} className="h-3" />
    </div>
  );
}
