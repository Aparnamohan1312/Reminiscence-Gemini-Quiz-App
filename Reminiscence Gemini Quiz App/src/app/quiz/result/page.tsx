import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { getResultMemory, quizQuestions, formatQuizAnswersForAI } from '@/lib/quiz-data';
import { generatePhotoCaption } from '@/ai/flows/generate-photo-caption';
import type { Metadata } from 'next';
import { ArrowLeft, RefreshCw, AlertTriangle, Music } from 'lucide-react';
import AudioPlayer from '@/components/quiz/AudioPlayer'; // Import the new AudioPlayer component

export const metadata: Metadata = {
  title: 'Your Memory Lane Result | Memory Lane Quiz',
  description: 'Here is your personalized memory and AI-generated caption for your mom.',
};

export default async function ResultPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const answersParam = searchParams?.answers;
  let userAnswers: Record<string, string> = {};

  if (typeof answersParam === 'string') {
    try {
      userAnswers = JSON.parse(answersParam);
    } catch (error) {
      console.error("Failed to parse answers:", error);
      return (
        <div className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4 md:p-8 text-center bg-gradient-to-br from-background via-secondary/10 to-background">
          <Card className="w-full max-w-md shadow-xl p-8">
            <AlertTriangle className="mx-auto h-12 w-12 text-destructive mb-4" />
            <h1 className="text-2xl font-bold mb-4 text-destructive">Error Processing Results</h1>
            <p className="mb-8 text-muted-foreground">Could not retrieve your quiz results due to an error. Please try taking the quiz again.</p>
            <Button asChild>
              <Link href="/quiz">
                <RefreshCw className="mr-2 h-4 w-4" />
                Retake Quiz
              </Link>
            </Button>
          </Card>
        </div>
      );
    }
  } else if (Object.keys(searchParams).length > 0 && !answersParam) {
     return (
        <div className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4 md:p-8 text-center bg-gradient-to-br from-background via-secondary/10 to-background">
          <Card className="w-full max-w-md shadow-xl p-8">
            <AlertTriangle className="mx-auto h-12 w-12 text-destructive mb-4" />
            <h1 className="text-2xl font-bold mb-4 text-destructive">Invalid Results Link</h1>
            <p className="mb-8 text-muted-foreground">The link to your results seems to be incomplete. Please try taking the quiz again.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild variant="outline">
                    <Link href="/"> <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home</Link>
                </Button>
                <Button asChild>
                    <Link href="/quiz"><RefreshCw className="mr-2 h-4 w-4" /> Retake Quiz</Link>
                </Button>
            </div>
          </Card>
        </div>
      );
  }

  const memory = getResultMemory(userAnswers);
  const formattedAnswers = formatQuizAnswersForAI(userAnswers, quizQuestions);
  
  let caption = "Here's a special memory dedicated to your wonderful mom!";
  try {
    if (Object.keys(userAnswers).length > 0) { 
      const aiResult = await generatePhotoCaption({
        quizAnswers: formattedAnswers,
        photoDescription: memory.photoDescription,
      });
      caption = aiResult.caption;
    } else {
      caption = `A lovely memory for your mom: ${memory.photoDescription}. Take the quiz to get a personalized caption!`;
    }
  } catch (error) {
    console.error("Failed to generate AI caption:", error);
    caption = `A lovely memory for your mom: ${memory.photoDescription}. (AI caption could not be generated at this time)`;
  }

  return (
    <div className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4 md:p-8 bg-gradient-to-br from-background via-secondary/10 to-background">
      <Card className="w-full max-w-2xl shadow-2xl rounded-xl overflow-hidden animate-fadeIn bg-card/90 backdrop-blur-sm">
        <CardHeader className="text-center p-8 bg-primary/10">
          <CardTitle className="text-3xl md:text-4xl font-bold text-primary-foreground/90">{memory.title}</CardTitle>
          <CardDescription className="text-lg md:text-xl text-muted-foreground pt-2">Based on your answers, here&apos;s a special tribute to your mom!</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-6 p-8">
          <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden shadow-lg border-4 border-background">
            <Image
              src={memory.photoUrl}
              alt={memory.photoDescription}
              fill
              style={{objectFit: 'cover'}}
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 800px"
              priority
              data-ai-hint={memory.aiHint}
              className="animate-fadeIn"
            />
          </div>
          <blockquote className="text-center text-lg italic p-6 bg-secondary/20 rounded-md shadow-inner border border-secondary/30 w-full">
            <p className="text-secondary-foreground/80">&ldquo;{caption}&rdquo;</p>
          </blockquote>

          {memory.songSuggestion && (
            <div className="mt-4 text-center w-full p-4 bg-background/70 rounded-md shadow">
              <h3 className="text-lg font-semibold text-foreground flex items-center justify-center">
                <Music className="mr-2 h-5 w-5 text-primary" />
                Mood Music for Mom
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Vibe: <span className="capitalize">{memory.mood}</span>
              </p>
              <p className="text-md text-foreground mt-1">
                 Play: &ldquo;{memory.songSuggestion.title}&rdquo; by {memory.songSuggestion.artist}
              </p>
              {memory.songSuggestion.audioUrl && (
                 <AudioPlayer audioUrl={memory.songSuggestion.audioUrl} />
              )}
            </div>
          )}

        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-center gap-4 p-8 border-t">
          <Button asChild variant="outline" className="shadow-sm">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <Button asChild className="shadow-sm">
            <Link href="/quiz">
              <RefreshCw className="mr-2 h-4 w-4" />
              Retake Quiz
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
