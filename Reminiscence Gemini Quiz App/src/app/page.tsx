import QuizClient from '@/components/quiz/QuizClient';
import { quizQuestions } from '@/lib/quiz-data';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Memory Lane Quiz | Answer Questions',
  description: 'Engage with our quiz to find a special memory tailored for you.',
};

export default function QuizPage() {
  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4 md:p-8 bg-gradient-to-br from-background via-secondary/10 to-background">
      <QuizClient questions={quizQuestions} />
    </main>
  );
}
