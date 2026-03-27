import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

export default function ServicesSection() {
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

  // Uporabimo prevode iz JSON datoteke
  const services = t('services.items', { returnObjects: true });

  return (
    <section ref={sectionRef} className="bg-[#0B0F14] py-24">
      <div className="max-w-7xl mx-auto px-8">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[#00D1FF] via-[#7C3AED] to-[#00D1FF] bg-clip-text text-transparent">
              {t('services.title')}
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {services.map((item, i) => {
            // Ikone ostanejo enake za vse jezike
            const icons = [
              (
                <svg className="w-6 h-6" fill="none" stroke="white" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              ),
              (
                <svg className="w-6 h-6" fill="none" stroke="white" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              ),
              (
                <svg className="w-6 h-6" fill="none" stroke="white" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              )
            ];

            return (
              <div
                key={i}
                className={`group relative p-6 rounded-2xl bg-[#11161D] border-2 border-[#2A2F36] hover:border-[#00D1FF]/50 transition-all duration-300 overflow-hidden flex flex-col items-center text-center ${isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
                  }`}
                style={{
                  animationDelay: `${i * 150}ms`,
                  animationFillMode: 'forwards'
                }}
              >
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br from-[#7C3AED] via-[#00D1FF] to-[#7C3AED] opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-[#7C3AED] via-[#00D1FF] to-[#7C3AED] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg text-[#00D1FF]`}>
                    {icons[i]}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-[#E6EDF3] group-hover:text-white transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[#8B949E] text-sm leading-relaxed group-hover:text-[#B0B8C0] transition-colors">
                    {item.description}
                  </p>
                </div>

                {/* Shine effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}