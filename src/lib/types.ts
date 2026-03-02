export type HouseId = 'SG' | 'AO' | 'CC' | 'EA' | 'PL';

export interface Answer {
  text: string;
  house: HouseId;
}

export interface Question {
  id: number;
  text: string;
  answers: Answer[];
}

export interface House {
  id: HouseId;
  name: string;
  tagline: string;
  description: string;
  strengths: string[];
  industries: string[];
  blindSpots: string[];
  nextSteps: string[];
  emoji: string;
  color: string;
  borderColor: string;
  glowColor: string;
}

export interface UserData {
  name: string;
  email: string;
  whatsapp: string;
}

export type QuizPhase = 'intro' | 'quiz' | 'email' | 'results';

export type Scores = Record<HouseId, number>;
