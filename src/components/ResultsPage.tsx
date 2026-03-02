'use client';

import type { House, Scores } from '@/lib/types';
import { houses } from '@/lib/houses';

interface ResultsPageProps {
  house: House;
  scores: Scores;
  userName: string;
}

export default function ResultsPage({ house, scores, userName }: ResultsPageProps) {
  const firstName = userName.split(' ')[0];
  const totalAnswers = Object.values(scores).reduce((a, b) => a + b, 0);

  const houseOrder: Array<keyof Scores> = ['SG', 'AO', 'CC', 'EA', 'PL'];

  return (
    <div className="animate-fade-in space-y-8 max-w-3xl mx-auto">
      {/* Congratulations header */}
      <div className="text-center space-y-3">
        <p className="text-gold/70 text-sm tracking-widest uppercase font-sans">
          The Sorting Ceremony has spoken
        </p>
        <h1 className="font-cinzel text-3xl sm:text-4xl md:text-5xl text-cream leading-tight">
          Congratulations,{' '}
          <span className="text-gold">{firstName}</span>
        </h1>
        <p className="text-cream/60 text-sm sm:text-base">
          You have been placed in...
        </p>
      </div>

      {/* House card */}
      <div
        className="relative rounded-2xl border-2 p-6 sm:p-8 text-center overflow-hidden"
        style={{
          borderColor: 'rgba(201, 168, 76, 0.6)',
          background: 'rgba(5, 9, 18, 0.8)',
          boxShadow: `0 0 60px ${house.glowColor}, 0 0 120px rgba(201, 168, 76, 0.1)`,
        }}
      >
        {/* Background glow */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at center, ${house.glowColor} 0%, transparent 70%)`,
          }}
        />

        <div className="relative z-10">
          <div className="text-6xl mb-4 animate-float">{house.emoji}</div>
          <h2 className="font-cinzel text-2xl sm:text-3xl md:text-4xl text-gold mb-2">
            {house.name}
          </h2>
          <p className="text-cream/70 text-base sm:text-lg italic mb-6 font-sans">
            {house.tagline}
          </p>
          <p className="text-cream/80 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            {house.description}
          </p>
        </div>
      </div>

      {/* Score breakdown */}
      <div className="rounded-2xl border border-gold/20 bg-white/5 backdrop-blur-sm p-6">
        <h3 className="font-cinzel text-lg text-gold mb-4 text-center">
          Your Career Character Profile
        </h3>
        <div className="space-y-3">
          {houseOrder.map((houseId) => {
            const h = houses.find((x) => x.id === houseId)!;
            const score = scores[houseId] ?? 0;
            const pct = totalAnswers > 0 ? Math.round((score / totalAnswers) * 100) : 0;
            const isWinner = houseId === house.id;

            return (
              <div key={houseId}>
                <div className="flex justify-between items-center mb-1">
                  <span
                    className={`text-xs sm:text-sm font-sans ${
                      isWinner ? 'text-gold font-semibold' : 'text-cream/60'
                    }`}
                  >
                    {isWinner && '★ '}{h.name}
                  </span>
                  <span
                    className={`text-xs font-sans ${
                      isWinner ? 'text-gold' : 'text-cream/40'
                    }`}
                  >
                    {pct}%
                  </span>
                </div>
                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: `${pct}%`,
                      background: isWinner
                        ? 'linear-gradient(90deg, #c9a84c, #e2c06e)'
                        : 'rgba(255,255,255,0.2)',
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Core strengths */}
      <div className="rounded-2xl border border-gold/20 bg-white/5 backdrop-blur-sm p-6 sm:p-8">
        <h3 className="font-cinzel text-xl text-gold mb-5 flex items-center gap-2">
          <span>⚔️</span> Your Core Strengths
        </h3>
        <ul className="space-y-3">
          {house.strengths.map((s, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="text-gold mt-0.5 flex-shrink-0">✦</span>
              <span className="text-cream/80 text-sm sm:text-base">{s}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Best-fit industries */}
      <div className="rounded-2xl border border-gold/20 bg-white/5 backdrop-blur-sm p-6 sm:p-8">
        <h3 className="font-cinzel text-xl text-gold mb-5 flex items-center gap-2">
          <span>🏰</span> Best-Fit UK Industries
        </h3>
        <ul className="space-y-3">
          {house.industries.map((ind, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="text-gold mt-0.5 flex-shrink-0">✦</span>
              <span className="text-cream/80 text-sm sm:text-base">{ind}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Potential blind spots */}
      <div className="rounded-2xl border border-gold/20 bg-white/5 backdrop-blur-sm p-6 sm:p-8">
        <h3 className="font-cinzel text-xl text-gold mb-5 flex items-center gap-2">
          <span>🪞</span> Potential Blind Spots
        </h3>
        <ul className="space-y-3">
          {house.blindSpots.map((b, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="text-gold/60 mt-0.5 flex-shrink-0">◈</span>
              <span className="text-cream/70 text-sm sm:text-base italic">{b}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Next steps */}
      <div className="rounded-2xl border border-gold/20 bg-white/5 backdrop-blur-sm p-6 sm:p-8">
        <h3 className="font-cinzel text-xl text-gold mb-5 flex items-center gap-2">
          <span>🗺️</span> Your 3 Strategic Next Steps
        </h3>
        <ol className="space-y-4">
          {house.nextSteps.map((step, i) => (
            <li key={i} className="flex items-start gap-4">
              <span
                className="flex-shrink-0 w-8 h-8 rounded-full border border-gold/50
                  flex items-center justify-center text-gold font-cinzel font-bold text-sm"
              >
                {i + 1}
              </span>
              <span className="text-cream/80 text-sm sm:text-base leading-relaxed pt-1">
                {step}
              </span>
            </li>
          ))}
        </ol>
      </div>

      {/* ——— WEBINAR CTA ——— */}
      <div
        className="relative rounded-2xl border-2 p-6 sm:p-10 overflow-hidden"
        style={{
          borderColor: '#c9a84c',
          background: 'rgba(5, 9, 18, 0.95)',
          boxShadow:
            '0 0 40px rgba(201, 168, 76, 0.25), 0 0 80px rgba(201, 168, 76, 0.08)',
        }}
      >
        {/* Decorative glow corners */}
        <div
          className="absolute top-0 left-0 w-32 h-32 pointer-events-none opacity-30"
          style={{
            background:
              'radial-gradient(ellipse at top left, rgba(201,168,76,0.4) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-32 h-32 pointer-events-none opacity-30"
          style={{
            background:
              'radial-gradient(ellipse at bottom right, rgba(201,168,76,0.4) 0%, transparent 70%)',
          }}
        />

        <div className="relative z-10 text-center space-y-6">
          <div className="text-3xl">🎓</div>

          <div>
            <p className="text-gold text-xs sm:text-sm tracking-widest uppercase font-sans mb-3">
              Your Next Step
            </p>
            <h3 className="font-cinzel text-xl sm:text-2xl md:text-3xl text-cream leading-tight">
              The Advance Academy Career Strategy Webinar
            </h3>
          </div>

          <p className="text-cream/70 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            Now that you know your Career Character — come discover exactly how to use it
            to land your dream UK role. Join us for a{' '}
            <span className="text-gold font-semibold">FREE 2-day live webinar</span> where
            we break down how to turn your strengths into job offers.
          </p>

          {/* Schedule */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="flex-1 max-w-xs mx-auto sm:mx-0 rounded-xl border border-gold/30 bg-white/5 px-5 py-4">
              <p className="text-gold text-xs tracking-widest uppercase mb-1 font-sans">
                Day 1
              </p>
              <p className="font-cinzel text-cream text-sm">Thursday 5th March</p>
              <p className="text-cream/60 text-xs mt-1">Career Identity &amp; Strategy</p>
            </div>
            <div className="flex-1 max-w-xs mx-auto sm:mx-0 rounded-xl border border-gold/30 bg-white/5 px-5 py-4">
              <p className="text-gold text-xs tracking-widest uppercase mb-1 font-sans">
                Day 2
              </p>
              <p className="font-cinzel text-cream text-sm">Friday 6th March</p>
              <p className="text-cream/60 text-xs mt-1">From Character to Job Offer</p>
            </div>
          </div>

          {/* CTA Button */}
          <a
            href="https://forms.gle/1dmP15jnPnSkpFwG8"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 rounded-xl font-cinzel font-bold
              text-navy text-sm sm:text-base tracking-wider uppercase
              bg-gradient-to-r from-gold to-gold-light
              hover:from-gold-light hover:to-gold
              transition-all duration-200
              shadow-lg hover:shadow-gold/40"
            style={{
              boxShadow: '0 0 20px rgba(201, 168, 76, 0.4)',
            }}
          >
            Reserve Your Free Spot →
          </a>

          <p className="text-cream/30 text-xs">
            Limited spaces available. Secure yours before it fills up.
          </p>
        </div>
      </div>

      {/* Share prompt */}
      <div className="text-center pb-8">
        <p className="text-cream/40 text-xs sm:text-sm">
          Share your result and inspire someone you know to discover their Career House.
        </p>
      </div>
    </div>
  );
}
