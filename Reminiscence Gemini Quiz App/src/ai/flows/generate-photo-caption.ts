
'use server';

/**
 * @fileOverview Generates a personalized caption for a memory photo based on quiz answers.
 *
 * - generatePhotoCaption - A function that generates the photo caption.
 * - GeneratePhotoCaptionInput - The input type for the generatePhotoCaption function.
 * - GeneratePhotoCaptionOutput - The return type for the generatePhotoCaption function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePhotoCaptionInputSchema = z.object({
  quizAnswers: z.string().describe("The answers provided by the user in the quiz about their mom."),
  photoDescription: z.string().describe('A description of the photo memory selected based on quiz answers.'),
});
export type GeneratePhotoCaptionInput = z.infer<typeof GeneratePhotoCaptionInputSchema>;

const GeneratePhotoCaptionOutputSchema = z.object({
  caption: z.string().describe('The generated caption for the memory photo, celebrating the user\'s mom.'),
});
export type GeneratePhotoCaptionOutput = z.infer<typeof GeneratePhotoCaptionOutputSchema>;

export async function generatePhotoCaption(input: GeneratePhotoCaptionInput): Promise<GeneratePhotoCaptionOutput> {
  return generatePhotoCaptionFlow(input);
}

const generateCaptionPrompt = ai.definePrompt({
  name: 'generateMomCaptionPrompt', // Renamed for clarity
  input: {schema: GeneratePhotoCaptionInputSchema},
  output: {schema: GeneratePhotoCaptionOutputSchema},
  prompt: `You are an AI caption generator specializing in creating heartfelt and personalized captions for memory photos dedicated to the user's mom.

  Based on the user's quiz answers about their mom and the photo description, generate a unique, touching, and engaging caption for the photo.
  The caption should reflect the mom's qualities, personality, and the specific memory as indicated by the quiz answers and photo.

  Quiz Answers about Mom: {{{quizAnswers}}}
  Photo Description: {{{photoDescription}}}

  Important: Conclude the caption with a sentiment similar to: "Blessed to have such an amazing mom, who is a superwoman, teacher, and guiding light, all in one incredible human." Adapt this ending to flow naturally and warmly with the rest of the caption. Ensure the tone is loving and celebratory.

  Caption:`,
});

const generatePhotoCaptionFlow = ai.defineFlow(
  {
    name: 'generatePhotoCaptionFlow',
    inputSchema: GeneratePhotoCaptionInputSchema,
    outputSchema: GeneratePhotoCaptionOutputSchema,
  },
  async input => {
    const {output} = await generateCaptionPrompt(input);
    return output!;
  }
);
