
export type QuizOption = {
  id: string;
  text: string;
  tag: string;
};

export type QuizQuestion = {
  id: string;
  text: string;
  options: QuizOption[];
  animatedImageUrl?: string; 
  animatedImageAlt?: string;
  aiHintAnimatedImage?: string;
  questionMoodSongUrl?: string;
};

export type PhotoMemory = {
  id: string;
  photoUrl: string;
  photoDescription: string;
  title: string;
  aiHint: string;
  mood: 'joyful' | 'reflective' | 'energetic' | 'calm' | 'uplifting' | 'inspiring' | 'wise';
  songSuggestion?: {
    title: string;
    artist: string;
    audioUrl: string;
  };
};

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    text: "Your mom often says, 'One thing I follow and always tell my kids is...' Which of these qualities resonates most with her spirit?",
    options: [
      { id: 'q1o1', text: 'Dhairyam (Boldness and Courage) - Facing life head-on.', tag: 'dhairyam' },
      { id: 'q1o2', text: 'Shanti (Peace and Tranquility) - Finding calm in the storm.', tag: 'calmSpirit' },
      { id: 'q1o3', text: 'Utsaha (Enthusiasm and Zest) - Embracing every moment.', tag: 'energeticSpirit' },
      { id: 'q1o4', text: 'Karuna (Compassion and Kindness) - Caring for others deeply.', tag: 'reflectiveSpirit' },
    ],
    animatedImageUrl: 'https://picsum.photos/seed/momtwodaughters/300/200',
    animatedImageAlt: 'Animated depiction of a mom with her two daughters sharing wisdom',
    aiHintAnimatedImage: 'mom two daughters animation',
    questionMoodSongUrl: '/music/dhairyam-question.mp3',
  },
  {
    id: 'q2',
    text: "If your mom's personality was a color, which of these best describes her essence, knowing her favorite is blue?",
    options: [
      { id: 'q2o1', text: 'A deep, calming Blue - like a vast, wise ocean.', tag: 'blueColor' },
      { id: 'q2o2', text: 'A vibrant, energetic Yellow - full of sunshine and positivity.', tag: 'energeticSpirit' },
      { id: 'q2o3', text: 'A strong, grounding Green - like a nurturing forest.', tag: 'calmSpirit' },
      { id: 'q2o4', text: 'A passionate, determined Red - full of drive.', tag: 'dhairyam' },
    ],
    animatedImageUrl: 'https://picsum.photos/seed/momkidsplayblue/300/200',
    animatedImageAlt: 'Animated depiction of mom and kids enjoying a blue-themed playful activity',
    aiHintAnimatedImage: 'mom kids play animation',
    questionMoodSongUrl: '/music/blue-question.mp3',
  },
  {
    id: 'q3',
    text: 'Which of these best represents a skill or passion your mom is known for?',
    options: [
      { id: 'q3o1', text: 'Mastering numbers - navigating Indian accountancy and taxes with ease.', tag: 'finance' },
      { id: 'q3o2', text: 'Inspiring minds - celebrating her 25 years in the teaching profession.', tag: 'teaching' },
      { id: 'q3o3', text: 'Culinary delights - especially her favorite sweet, Badhusha.', tag: 'sweets' },
      { id: 'q3o4', text: 'Staying curious - always updated with the latest tech and news.', tag: 'techSavvy' },
    ],
    animatedImageUrl: 'https://picsum.photos/seed/teachingconcept/300/200',
    animatedImageAlt: 'Animated depiction of teaching and learning concepts',
    aiHintAnimatedImage: 'animated teaching books', 
    questionMoodSongUrl: '/music/finance-question.mp3', 
  },
  {
    id: 'q4',
    text: 'Which of these life lessons from your mom echoes the loudest for you?',
    options: [
      { id: 'q4o1', text: "'Trust the process with patience; challenges make you stronger.'", tag: 'wisdom' },
      { id: 'q4o2', text: "'You are stronger and smarter than you think; trust in yourself and God.'", tag: 'wisdom' },
      { id: 'q4o3', text: "'Live in the moment, think positive, and always strive to be better than you were yesterday.'", tag: 'wisdom' },
      { id: 'q4o4', text: "'Embrace being a lifelong hustler, always learning and growing.'", tag: 'wisdomHustler' },
    ],
    animatedImageUrl: 'https://picsum.photos/seed/momkidslearningstory/300/200',
    animatedImageAlt: 'Animated depiction of a mom sharing wisdom with her kids',
    aiHintAnimatedImage: 'mom kids learning animation',
    questionMoodSongUrl: '/music/wisdom-question.mp3',
  },
];

export const photoMemories: PhotoMemory[] = [
  {
    id: 'dhairyam',
    title: 'The Spirit of Dhairyam',
    photoUrl: 'https://picsum.photos/seed/couragepeak/800/600',
    photoDescription: "A symbolic image of courage and boldness, like a majestic lion or a person confidently overcoming an obstacle.",
    aiHint: 'lion courage',
    mood: 'uplifting',
    songSuggestion: {
      title: 'Eye of the Tiger',
      artist: 'Survivor',
      audioUrl: '/music/eye-of-the-tiger.mp3',
    },
  },
  {
    id: 'blueColor',
    title: 'Her Favorite Hue: Tranquil Blue',
    photoUrl: 'https://picsum.photos/seed/bluelagoon/800/600',
    photoDescription: "A serene and beautiful scene dominated by shades of blue, like a calm ocean under a clear sky or beautiful blue flowers.",
    aiHint: 'ocean blue',
    mood: 'calm',
    songSuggestion: {
      title: 'Bluebird',
      artist: 'Miranda Lambert',
      audioUrl: '/music/bluebird.mp3',
    },
  },
  {
    id: 'finance',
    title: 'Master of Details & Finances',
    photoUrl: 'https://picsum.photos/seed/orderlydesk/800/600',
    photoDescription: "An organized workspace with ledgers and a calculator, or a symbolic representation of financial acumen and order.",
    aiHint: 'accounting finance',
    mood: 'reflective',
    songSuggestion: {
      title: 'Money, Money, Money',
      artist: 'ABBA',
      audioUrl: '/music/money-money-money.mp3',
    },
  },
  {
    id: 'teaching',
    title: 'A Legacy of Learning: 25 Years an Educator',
    photoUrl: 'https://picsum.photos/seed/booksapple/800/600',
    photoDescription: "A warm, inspiring image related to teaching, like a stack of books with an apple, or a guiding hand helping a student.",
    aiHint: 'teacher classroom',
    mood: 'inspiring',
    songSuggestion: {
      title: 'To Sir, with Love',
      artist: 'Lulu',
      audioUrl: '/music/to-sir-with-love.mp3',
    },
  },
  {
    id: 'sweets',
    title: 'Sweet Moments: Bhadhusha Love',
    photoUrl: 'https://picsum.photos/seed/festivesweet/800/600',
    photoDescription: "A delightful and appetizing image of the Indian sweet Bhadhusha, perhaps on a festive platter.",
    aiHint: 'badhusha sweet',
    mood: 'joyful',
    songSuggestion: {
      title: 'Sugar, Sugar',
      artist: 'The Archies',
      audioUrl: '/music/sugar-sugar.mp3',
    },
  },
  {
    id: 'techSavvy',
    title: 'Always Curious, Always Connected',
    photoUrl: 'https://picsum.photos/seed/sleektablet/800/600',
    photoDescription: "An image representing modern technology and staying updated, like a person engaging with a sleek tablet displaying news or learning content.",
    aiHint: 'modern technology',
    mood: 'energetic',
    songSuggestion: {
      title: 'Mr. Roboto',
      artist: 'Styx',
      audioUrl: '/music/mr-roboto.mp3',
    },
  },
  {
    id: 'wisdom',
    title: 'Words of Wisdom: A Guiding Light',
    photoUrl: 'https://picsum.photos/seed/inspiringsunrise/800/600',
    photoDescription: "An inspiring image representing wisdom and life lessons, like a sunrise over a peaceful landscape or a well-worn book of quotes.",
    aiHint: 'sunrise inspirational',
    mood: 'wise',
    songSuggestion: {
      title: 'Let It Be',
      artist: 'The Beatles',
      audioUrl: '/music/let-it-be.mp3',
    },
  },
   {
    id: 'wisdomHustler', 
    title: 'The Lifelong Learner & Hustler',
    photoUrl: 'https://picsum.photos/seed/pathupwards/800/600',
    photoDescription: "An energetic image symbolizing continuous growth and effort, like a path winding upwards or someone actively engaging in a new skill.",
    aiHint: 'person learning',
    mood: 'energetic',
    songSuggestion: {
      title: "Ain't No Mountain High Enough",
      artist: 'Marvin Gaye & Tammi Terrell',
      audioUrl: '/music/aint-no-mountain.mp3',
    },
  },
  { 
    id: 'calmSpirit',
    title: 'A Spirit of Calm',
    photoUrl: 'https://picsum.photos/seed/serenegarden/800/600',
    photoDescription: 'A tranquil scene, like a serene lake at dawn or a peaceful garden.',
    aiHint: 'serene lake',
    mood: 'calm',
    songSuggestion: {
      title: 'Orinoco Flow',
      artist: 'Enya',
      audioUrl: '/music/orinoco-flow.mp3',
    },
  },
  {
    id: 'energeticSpirit',
    title: 'An Energetic Spirit',
    photoUrl: 'https://picsum.photos/seed/colorburst/800/600',
    photoDescription: 'A vibrant, dynamic image, like a burst of colors or someone joyfully active.',
    aiHint: 'vibrant colors',
    mood: 'energetic',
    songSuggestion: {
      title: 'Walking on Sunshine',
      artist: 'Katrina & The Waves',
      audioUrl: '/music/walking-on-sunshine.mp3',
    },
  },
  {
    id: 'reflectiveSpirit',
    title: 'A Reflective Spirit',
    photoUrl: 'https://picsum.photos/seed/quietlibrary/800/600',
    photoDescription: 'A thoughtful scene, like a person looking over a landscape at sunset or a quiet library.',
    aiHint: 'sunset thinking',
    mood: 'reflective',
    songSuggestion: {
      title: 'The Sound of Silence',
      artist: 'Simon & Garfunkel',
      audioUrl: '/music/sound-of-silence.mp3',
    },
  },
  {
    id: 'default',
    title: 'My Super Mom',
    photoUrl: 'https://picsum.photos/seed/empoweringmom/800/600',
    photoDescription: "A heartwarming and empowering image symbolizing a mother's multifaceted strength, love, and guidance. Perhaps a silhouette of a motherly figure with a cape-like aura, or a warm, loving embrace.",
    aiHint: 'super mom',
    mood: 'uplifting',
    songSuggestion: {
      title: 'You Raise Me Up',
      artist: 'Josh Groban',
      audioUrl: '/music/you-raise-me-up.mp3',
    },
  }
];

export const getResultMemory = (answers: Record<string, string>): PhotoMemory => {
  const tagCounts: Record<string, number> = {};
  for (const questionId in answers) {
    const optionId = answers[questionId];
    const question = quizQuestions.find(q => q.id === questionId);
    if (question) {
      const option = question.options.find(o => o.id === optionId);
      if (option) {
        tagCounts[option.tag] = (tagCounts[option.tag] || 0) + 1;
      }
    }
  }

  let maxCount = 0;
  let resultTag = 'default'; 

  for (const tag in tagCounts) {
    if (tagCounts[tag] > maxCount) {
      maxCount = tagCounts[tag];
    }
  }
  
  const topTags = Object.keys(tagCounts).filter(tag => tagCounts[tag] === maxCount && maxCount > 0);

  if (topTags.length === 1) {
    resultTag = topTags[0];
  } else if (topTags.length > 1) {
    // If multiple tags have the same max count, pick the first one.
    // Could be randomized or prioritized if needed.
    resultTag = topTags[0]; 
  }
  // Ensure 'default' is used if no tags were effectively chosen or if the chosen tag doesn't map to a memory
  return photoMemories.find(memory => memory.id === resultTag) || photoMemories.find(m => m.id === 'default')!;
};

export function formatQuizAnswersForAI(
  answers: Record<string, string>,
  questions: QuizQuestion[]
): string {
  let formatted = "User's quiz choices about their mom:\n";
  questions.forEach(q => {
    const answerOptionId = answers[q.id];
    if (answerOptionId) {
      const selectedOption = q.options.find(opt => opt.id === answerOptionId);
      if (selectedOption) {
        formatted += `- For the question "${q.text}", the user's mom relates to: "${selectedOption.text}".\n`;
      }
    }
  });
  if (Object.keys(answers).length === 0) {
    return "User did not provide any specific answers about their mom.";
  }
  return formatted.trim();
}
