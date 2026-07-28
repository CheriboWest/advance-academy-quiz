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
  // Short hand-written feedback shown on the pre-email "reveal" step (P1).
  // Template only — NO LLM. One line of strength + one thing to work on.
  teaser: string;
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
  // Explicit, un-pre-ticked marketing opt-in (UK GDPR / PECR). Not required to
  // see the result — only gates whether we email/nurture the lead.
  consentMarketing: boolean;
}

export type QuizPhase = 'intro' | 'quiz' | 'reveal' | 'email' | 'results';

export type Scores = Record<HouseId, number>;
