import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

export default function ProcessSection() {
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
  const steps = t('process.steps', { returnObjects: true });

  // Gradienti ostanejo enaki za vse jezike
  const gradients = [
    "from-[#00D1FF] to-[#00A8CC]",
    "from-[#00D1FF] via-[#7C3AED] to-[#00D1FF]",
    "from-[#7C3AED] to-[#5B21B6]",
    "from-[#7C3AED] via-[#00D1FF] to-[#7C3AED]",
    "from-[#00D1FF] to-[#00D1FF]"
  ];

  return (
    <section id="process" ref={sectionRef} className="bg-[#0B0F14] py-24">
      <div className="max-w-7xl mx-auto px-8">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#E6EDF3]">
            {t('process.title')}
          </h2>
          <p className="text-lg text-[#8B949E] mt-4">
            {t('process.subtitle')}
          </p>
        </div>

        <div className="relative">
          {/* Gradient linija za desktop */}
          <div className="hidden md:block absolute top-12 left-0 right-0 h-1 bg-gradient-to-r from-[#00D1FF]/30 via-[#7C3AED]/50 to-[#00D1FF]/30" />

          {/* Koraki */}
          <div className="grid md:grid-cols-5 gap-6 md:gap-4 relative">
            {steps.map((item, i) => (
              <div
                key={i}
                className={`group relative flex flex-col items-center text-center transition-all duration-1000 ${isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
                  }`}
                style={{
                  animationDelay: `${i * 150}ms`,
                  animationFillMode: 'forwards'
                }}
              >
                {/* Chevron down puščica nad krogcem - samo na mobilnih napravah, razen pri prvem */}
                {i > 0 && (
                  <div className="md:hidden mb-4">
                    <svg
                      className="w-6 h-6 text-[#00D1FF]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                )}

                {/* Številka kroga */}
                <div className={`relative w-20 h-20 rounded-full bg-gradient-to-br ${gradients[i]} flex items-center justify-center text-3xl font-bold shadow-lg group-hover:scale-110 group-hover:shadow-2xl transition-all duration-300 z-10 mb-4 md:mb-4`}>
                  <span className="text-white drop-shadow-lg">{item.step}</span>
                  {/* Pulsirajoči efekt */}
                  <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${gradients[i]} opacity-0 group-hover:opacity-50 group-hover:scale-150 transition-all duration-500`} />
                </div>

                {/* Vsebina */}
                <div className="mt-4 md:mt-2 max-w-[200px]">
                  <h3 className="text-lg font-bold text-[#E6EDF3] mb-2 group-hover:text-white transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#8B949E] leading-relaxed group-hover:text-[#B0B8C0] transition-colors">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}