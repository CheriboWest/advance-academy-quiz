import type { House } from './types';

export const houses: House[] = [
  {
    id: 'SG',
    name: 'The Strategist Guild',
    tagline: 'Masters of the Long Game',
    description:
      'You think like a chess grandmaster in a world of checkers players. The Strategist Guild recognises your rare ability to see patterns, anticipate consequences, and shape the direction of organisations before others even see the opportunity. You are the architect of outcomes — the person senior leaders lean on when it matters most.',
    strengths: [
      'Strategic thinking and visionary leadership',
      'Complex problem-solving and frameworks',
      'Executive communication and board-level presence',
      'Competitive analysis and market positioning',
    ],
    industries: [
      'Management Consulting (McKinsey, BCG, Deloitte, KPMG)',
      'Corporate Strategy & Business Analysis',
      'Operations Management & Transformation',
      'Policy & Public Sector Strategy',
    ],
    blindSpots: [
      'Can over-think and delay action while perfecting the plan',
      'May struggle with hands-on execution and the granular details',
      'Risk of analysis paralysis under tight deadlines',
    ],
    nextSteps: [
      'Target Big 4, boutique consultancies, or internal strategy teams at FTSE 100 firms',
      'Build a portfolio of strategic frameworks and case study presentations',
      'Develop executive presence: practise boardroom communication and structured storytelling',
    ],
    emoji: '♟️',
    color: 'from-indigo-900 to-navy',
    borderColor: 'border-indigo-400',
    glowColor: 'rgba(99, 102, 241, 0.4)',
  },
  {
    id: 'AO',
    name: 'The Analytical Order',
    tagline: 'Conjurers of Clarity',
    description:
      'Where others see chaos, you see patterns. Where others see risk, you see probability. The Analytical Order recognises your gift for transforming complex, messy data into clarity, confidence, and competitive advantage. You are the person organisations cannot afford to make major decisions without.',
    strengths: [
      'Quantitative analysis and financial modelling',
      'Data interpretation and evidence-based decision making',
      'Logical reasoning and structured problem solving',
      'Risk assessment and scenario planning',
    ],
    industries: [
      'Investment Banking & Asset Management',
      'Data Science, Analytics & Business Intelligence',
      'Fintech & Risk Management',
      'Accounting, Finance & Treasury',
    ],
    blindSpots: [
      'May over-rely on data and undervalue intuition in fast-moving situations',
      'Communication style can feel too technical for non-analytical audiences',
      'Risk of spending too long on analysis when speed matters',
    ],
    nextSteps: [
      'Build a strong technical portfolio — models, dashboards, published insights',
      'Pursue professional qualifications: CFA, ACCA, ACA, or data certifications',
      'Develop data storytelling skills: translate numbers into compelling narratives for business leaders',
    ],
    emoji: '🔮',
    color: 'from-blue-900 to-navy',
    borderColor: 'border-blue-400',
    glowColor: 'rgba(59, 130, 246, 0.4)',
  },
  {
    id: 'CC',
    name: 'The Connector Circle',
    tagline: 'Wielders of Human Magic',
    description:
      'People are your superpower. The Connector Circle recognises your magnetic ability to build relationships, open doors, and turn networks into opportunities that change careers, companies, and communities. You do not just know people — you bring the right people together at exactly the right moment.',
    strengths: [
      'Relationship building and stakeholder influence',
      'Persuasion, pitching, and high-impact communication',
      'Personal branding and market positioning',
      'Emotional intelligence and team culture building',
    ],
    industries: [
      'Marketing, Brand, and Digital Media',
      'Sales, Business Development & Account Management',
      'Talent Acquisition & Executive Recruitment',
      'PR, Communications & Client Relations',
    ],
    blindSpots: [
      'Can prioritise relationships over results when hard decisions must be made',
      'May avoid necessary conflict to preserve harmony',
      'Risk of spreading energy across too many connections without depth',
    ],
    nextSteps: [
      'Build a powerful LinkedIn presence and become a recognised voice in your sector',
      'Join professional communities: networking events, industry associations, masterminds',
      'Develop a signature communication style — practise pitching, storytelling, and negotiation',
    ],
    emoji: '🌟',
    color: 'from-amber-900 to-navy',
    borderColor: 'border-amber-400',
    glowColor: 'rgba(245, 158, 11, 0.4)',
  },
  {
    id: 'EA',
    name: 'The Execution Alliance',
    tagline: 'Architects of the Done',
    description:
      'While others dream, you deliver. The Execution Alliance recognises your exceptional ability to transform ambitious plans into tangible reality, lead teams through complexity, and bring order to chaos. You are the person every great team needs — the one who actually makes things happen.',
    strengths: [
      'Project and programme management at scale',
      'Process design, optimisation, and operational excellence',
      'Stakeholder management and cross-functional coordination',
      'Meticulous attention to detail and deadline discipline',
    ],
    industries: [
      'Project & Programme Management',
      'Operations, Logistics & Supply Chain',
      'Events Management & Production',
      'Executive Assistance & Office Management',
    ],
    blindSpots: [
      'Can become the "default doer" without positioning for leadership',
      'May resist ambiguity and struggle when processes are unclear',
      'Risk of being undervalued by not communicating your strategic contribution',
    ],
    nextSteps: [
      'Get professionally certified: PRINCE2, PMP, or Agile/Scrum credentials',
      'Build a portfolio of delivered projects — quantify scope, budget, and impact',
      'Develop your strategic narrative: articulate how your execution creates competitive advantage',
    ],
    emoji: '⚡',
    color: 'from-emerald-900 to-navy',
    borderColor: 'border-emerald-400',
    glowColor: 'rgba(52, 211, 153, 0.4)',
  },
  {
    id: 'PL',
    name: 'The Pioneer League',
    tagline: 'Forgers of New Worlds',
    description:
      'You do not follow paths — you forge them. The Pioneer League recognises your entrepreneurial spirit, your appetite for innovation, and your rare ability to see opportunity where others only see risk. You are wired for creation, built for disruption, and driven by the question: "What if we built something better?"',
    strengths: [
      'Entrepreneurial thinking and commercial creativity',
      'Innovation, risk appetite, and opportunity identification',
      'Resilience, adaptability, and self-motivation',
      'Business development and growth mindset',
    ],
    industries: [
      'Startups & Scale-ups across all sectors',
      'Business Development & Commercial Partnerships',
      'Venture Capital & Private Equity',
      'Product Management & Innovation Consulting',
    ],
    blindSpots: [
      'Can struggle with structure, routine, and sustained follow-through',
      'Risk of chasing the next idea before finishing the current one',
      'May find corporate environments stifling and lose energy in slow-moving organisations',
    ],
    nextSteps: [
      'Join a startup ecosystem: accelerators, incubators, or Founder communities in the UK',
      'Build and launch something — even a small project validates your entrepreneurial instincts',
      'Develop commercial and fundraising fluency: pitch decks, financials, investor language',
    ],
    emoji: '🚀',
    color: 'from-rose-900 to-navy',
    borderColor: 'border-rose-400',
    glowColor: 'rgba(251, 113, 133, 0.4)',
  },
];

export const getHouseById = (id: string): House | undefined =>
  houses.find((h) => h.id === id);
