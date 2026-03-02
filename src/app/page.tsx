'use client';

import { useState, useCallback } from 'react';
import ParticleBackground from '@/components/ParticleBackground';
import QuizQuestion from '@/components/QuizQuestion';
import EmailGate from '@/components/EmailGate';
import ResultsPage from '@/components/ResultsPage';
import { questions } from '@/lib/questions';
import { getHouseById } from '@/lib/houses';
import type { QuizPhase, Scores, UserData, HouseId } from '@/lib/types';

const TOTAL_QUESTIONS = questions.length;

export default function Home() {
  const [phase, setPhase] = useState<QuizPhase>('intro');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [scores, setScores] = useState<Scores>({ SG: 0, AO: 0, CC: 0, EA: 0, PL: 0 });
  const [resultHouseId, setResultHouseId] = useState<HouseId>('SG');
  const [userData, setUserData] = useState<UserData>({ name: '', email: '', whatsapp: '' });
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const progress =
    phase === 'quiz' ? ((questionIndex + 1) / TOTAL_QUESTIONS) * 100 : 0;

  const handleAnswer = useCallback(
    (houseId: string) => {
      if (isTransitioning) return;

      const newScores = { ...scores, [houseId]: (scores[houseId as HouseId] ?? 0) + 1 };
      setScores(newScores);

      setIsTransitioning(true);

      setTimeout(() => {
        if (questionIndex < TOTAL_QUESTIONS - 1) {
          setQuestionIndex((prev) => prev + 1);
          setIsTransitioning(false);
        } else {
          // Quiz complete — find winning house
          const winner = (Object.entries(newScores) as [HouseId, number][]).reduce(
            (a, b) => (b[1] > a[1] ? b : a)
          )[0];
          setResultHouseId(winner);
          setIsTransitioning(false);
          setPhase('email');
        }
      }, 320);
    },
    [questionIndex, scores, isTransitioning]
  );

  const handleEmailSubmit = async (data: UserData) => {
    setUserData(data);
    setIsSubmitting(true);
    setSubmitError('');

    const scoreBreakdown = Object.entries(scores)
      .map(([house, count]) => `${house}:${count}`)
      .join(', ');

    try {
      await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          whatsapp: data.whatsapp,
          house: resultHouseId,
          scoreBreakdown,
        }),
      });
    } catch {
      // Non-blocking — still show results even if submission fails
      setSubmitError('');
    } finally {
      setIsSubmitting(false);
      setPhase('results');
    }
  };

  const resultHouse = getHouseById(resultHouseId);

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-start overflow-x-hidden">
      {/* Particle background */}
      <ParticleBackground />

      {/* Radial gradient overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(201,168,76,0.06) 0%, transparent 70%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12 min-h-screen flex flex-col">

        {/* ====== HEADER ====== */}
        {phase !== 'results' && (
          <header className="text-center mb-8 sm:mb-12">
            <p className="text-gold/60 text-xs tracking-[0.3em] uppercase font-sans mb-2">
              The Advance Academy Presents
            </p>
            <h1 className="font-cinzel text-2xl sm:text-3xl md:text-4xl text-cream leading-tight gold-shimmer">
              Career Sorting Ceremony
            </h1>
          </header>
        )}

        {/* ====== PROGRESS BAR (quiz only) ====== */}
        {phase === 'quiz' && (
          <div className="mb-8 sm:mb-10">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gold/50 text-xs font-sans tracking-wider">
                {questionIndex + 1} / {TOTAL_QUESTIONS}
              </span>
              <span className="text-gold/50 text-xs font-sans">
                {Math.round(progress)}% complete
              </span>
            </div>
            <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full progress-glow transition-all duration-500 ease-out"
                style={{
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, #c9a84c, #e2c06e)',
                }}
              />
            </div>
          </div>
        )}

        {/* ====== MAIN CONTENT AREA ====== */}
        <div className="flex-1 flex flex-col justify-center">

          {/* ——— INTRO PHASE ——— */}
          {phase === 'intro' && (
            <div className="text-center space-y-8 animate-fade-in">
              {/* Decorative icon */}
              <div className="flex justify-center">
                <div
                  className="w-24 h-24 rounded-full border-2 border-gold/40 flex items-center justify-center text-5xl animate-float"
                  style={{ boxShadow: '0 0 40px rgba(201,168,76,0.2)' }}
                >
                  🏰
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="font-cinzel text-3xl sm:text-4xl text-cream leading-tight">
                  Discover Your{' '}
                  <span className="text-gold">Career Character</span>
                </h2>
                <p className="text-cream/60 text-base sm:text-lg leading-relaxed max-w-lg mx-auto">
                  20 powerful questions. 5 Career Houses. One clear path to your dream UK role.
                  The Sorting Hat is ready — are you?
                </p>
              </div>

              {/* House preview pills */}
              <div className="flex flex-wrap justify-center gap-2 max-w-md mx-auto">
                {[
                  { emoji: '♟️', name: 'Strategist Guild' },
                  { emoji: '🔮', name: 'Analytical Order' },
                  { emoji: '🌟', name: 'Connector Circle' },
                  { emoji: '⚡', name: 'Execution Alliance' },
                  { emoji: '🚀', name: 'Pioneer League' },
                ].map((h) => (
                  <span
                    key={h.name}
                    className="px-3 py-1.5 rounded-full border border-gold/20 bg-white/5
                      text-cream/60 text-xs font-sans tracking-wide
                      hover:border-gold/40 hover:text-cream/80 transition-colors duration-200"
                  >
                    {h.emoji} {h.name}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="flex justify-center gap-8 text-center">
                {[
                  { value: '20', label: 'Questions' },
                  { value: '5', label: 'Career Houses' },
                  { value: '~5 min', label: 'To complete' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="font-cinzel text-2xl text-gold">{stat.value}</p>
                    <p className="text-cream/40 text-xs font-sans mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Start button */}
              <button
                onClick={() => setPhase('quiz')}
                className="inline-block px-10 py-4 rounded-xl font-cinzel font-bold
                  text-navy text-base tracking-wider uppercase
                  bg-gradient-to-r from-gold to-gold-light
                  hover:from-gold-light hover:to-gold
                  transition-all duration-200
                  shadow-lg hover:shadow-gold/40 animate-pulse-glow"
                style={{ boxShadow: '0 0 30px rgba(201,168,76,0.3)' }}
              >
                Begin the Ceremony →
              </button>

              <p className="text-cream/30 text-xs">
                Free · No sign-up until the end · Takes ~5 minutes
              </p>
            </div>
          )}

          {/* ——— QUIZ PHASE ——— */}
          {phase === 'quiz' && (
            <div className="glass-card rounded-2xl p-6 sm:p-8">
              <QuizQuestion
                question={questions[questionIndex]}
                questionIndex={questionIndex}
                totalQuestions={TOTAL_QUESTIONS}
                onAnswer={handleAnswer}
                visible={!isTransitioning}
              />
            </div>
          )}

          {/* ——— EMAIL GATE ——— */}
          {phase === 'email' && (
            <div className="glass-card rounded-2xl p-6 sm:p-8">
              <EmailGate onSubmit={handleEmailSubmit} isLoading={isSubmitting} />
              {submitError && (
                <p className="mt-4 text-center text-red-400 text-sm">{submitError}</p>
              )}
            </div>
          )}

          {/* ——— RESULTS PHASE ——— */}
          {phase === 'results' && resultHouse && (
            <ResultsPage
              house={resultHouse}
              scores={scores}
              userName={userData.name}
            />
          )}
        </div>

        {/* ====== FOOTER ====== */}
        <footer className="mt-12 text-center">
          <p className="text-cream/20 text-xs font-sans">
            © {new Date().getFullYear()} The Advance Academy · All rights reserved
          </p>
        </footer>
      </div>
    </main>
  );
}
