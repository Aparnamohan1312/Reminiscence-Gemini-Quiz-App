"use client";

import type { QuizQuestion } from "@/lib/quiz-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import AudioPlayer from "./AudioPlayer";

interface QuestionCardProps {
  question: QuizQuestion;
  selectedAnswer: string | undefined;
  onAnswerSelect: (optionId: string) => void;
  questionNumber: number;
  totalQuestions: number;
}

export default function QuestionCard({
  question,
  selectedAnswer,
  onAnswerSelect,
  questionNumber,
}: QuestionCardProps) {
  return (
    <Card className="w-full shadow-xl bg-card/90 backdrop-blur-sm">
      <CardHeader>
        <CardDescription className="text-sm text-muted-foreground">
          Question {questionNumber}
        </CardDescription>
        <CardTitle className="text-2xl font-semibold leading-tight">{question.text}</CardTitle>
      </CardHeader>
      <CardContent>
        {question.animatedImageUrl && question.animatedImageAlt && (
          <div className="mb-6 relative w-full aspect-[16/9] rounded-lg overflow-hidden shadow-md border-2 border-background">
            <Image
              src={question.animatedImageUrl}
              alt={question.animatedImageAlt}
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw, 300px"
              priority={questionNumber === 1} // Prioritize first image
              data-ai-hint={question.aiHintAnimatedImage || 'mom animation'}
              className="animate-fadeIn"
            />
          </div>
        )}

        {question.questionMoodSongUrl && (
          <div className="my-4">
            <AudioPlayer 
              key={question.questionMoodSongUrl} // Important: re-mounts player on song change
              audioUrl={question.questionMoodSongUrl} 
            />
          </div>
        )}

        <RadioGroup
          value={selectedAnswer}
          onValueChange={onAnswerSelect}
          className="space-y-3"
          aria-label={`Options for question: ${question.text}`}
        >
          {question.options.map((option) => (
            <Label
              key={option.id}
              htmlFor={option.id}
              className={`flex items-center space-x-3 p-4 rounded-lg border cursor-pointer transition-all duration-200 ease-out
                ${selectedAnswer === option.id 
                  ? 'bg-primary/20 border-primary ring-2 ring-primary shadow-md' 
                  : 'bg-background hover:bg-secondary/50 hover:border-secondary-foreground/30'
                }`}
            >
              <RadioGroupItem value={option.id} id={option.id} />
              <span className="text-base">{option.text}</span>
            </Label>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
}
