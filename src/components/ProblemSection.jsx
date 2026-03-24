import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

export default function ProblemSection() {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const problems = t('problem.items', { returnObjects: true });

  return (
    <section
      ref={sectionRef}
      className="py-24 px-8 relative overflow-hidden bg-[#0B0F14]"
    >
      {/* Animirano ozadje */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-br from-[#00D1FF]/10 via-[#7C3AED]/5 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-[#7C3AED]/10 via-[#00D1FF]/5 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-widest text-[#8B949E] mb-3">Problem</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[#00D1FF] via-[#7C3AED] to-[#00D1FF] bg-clip-text text-transparent">
              {t('problem.title')}
            </span>
          </h2>
          <p className="text-lg text-[#8B949E] max-w-2xl mx-auto">{t('problem.description')}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {problems.map((problem, i) => (
            <div
              key={i}
              className={`group relative p-6 rounded-2xl bg-[#11161D] border-2 border-[#2A2F36] hover:border-[#00D1FF]/50 transition-all duration-300 overflow-hidden ${isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
                }`}
              style={{
                animationDelay: `${i * 100}ms`,
                animationFillMode: 'forwards'
              }}
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#00D1FF]/10 via-[#7C3AED]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

              {/* Content */}
              <div className="relative z-10 flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-[#00D1FF]/20 to-[#7C3AED]/20 flex items-center justify-center text-[#00D1FF] text-xl font-bold group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                  ⚠
                </div>
                <p className="text-[#E6EDF3] leading-relaxed flex-1 group-hover:text-white transition-colors text-base">
                  {problem}
                </p>
              </div>

              {/* Shine effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-2xl" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}