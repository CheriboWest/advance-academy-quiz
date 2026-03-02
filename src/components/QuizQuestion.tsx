'use client';

import type { Question } from '@/lib/types';

interface QuizQuestionProps {
  question: Question;
  questionIndex: number;
  totalQuestions: number;
  onAnswer: (houseId: string) => void;
  visible: boolean;
}

export default function QuizQuestion({
  question,
  questionIndex,
  totalQuestions,
  onAnswer,
  visible,
}: QuizQuestionProps) {
  const answerLetters = ['A', 'B', 'C', 'D'];

  return (
    <div
      className={`transition-all duration-400 ease-in-out ${
        visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
      }`}
    >
      {/* Question number */}
      <p className="text-gold/60 text-sm font-sans tracking-widest uppercase mb-4">
        Question {questionIndex + 1} of {totalQuestions}
      </p>

      {/* Question text */}
      <h2 className="font-cinzel text-xl sm:text-2xl md:text-3xl text-cream mb-8 leading-snug">
        {question.text}
      </h2>

      {/* Answer options */}
      <div className="grid gap-3 sm:gap-4">
        {question.answers.map((answer, idx) => (
          <button
            key={idx}
            onClick={() => onAnswer(answer.house)}
            className="group relative w-full text-left px-5 py-4 rounded-xl
              border border-gold/20 bg-white/5 backdrop-blur-sm
              hover:border-gold/60 hover:bg-white/10
              active:scale-[0.98]
              transition-all duration-200 ease-in-out
              focus:outline-none focus:border-gold/60"
          >
            <div className="flex items-start gap-4">
              {/* Letter badge */}
              <span
                className="flex-shrink-0 w-8 h-8 rounded-full border border-gold/40
                  flex items-center justify-center text-gold text-sm font-cinzel font-bold
                  group-hover:bg-gold/20 group-hover:border-gold
                  transition-all duration-200"
              >
                {answerLetters[idx]}
              </span>

              {/* Answer text */}
              <span className="text-cream/80 group-hover:text-cream text-sm sm:text-base leading-relaxed transition-colors duration-200">
                {answer.text}
              </span>
            </div>

            {/* Hover glow effect */}
            <div
              className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100
                transition-opacity duration-200 pointer-events-none"
              style={{
                background:
                  'linear-gradient(135deg, rgba(201,168,76,0.05) 0%, transparent 100%)',
              }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
