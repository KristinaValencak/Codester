import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

export default function TargetAudienceSection() {
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
  const items = t('targetAudience.items', { returnObjects: true });

  // Gradienti ostanejo enaki za vse jezike
  const gradients = [
    "from-[#00D1FF] to-[#00A8CC]",
    "from-[#7C3AED] to-[#5B21B6]",
    "from-[#00D1FF] via-[#7C3AED] to-[#00D1FF]",
    "from-[#7C3AED] to-[#5B21B6]",
    "from-[#00D1FF] to-[#00A8CC]",
    "from-[#7C3AED] via-[#00D1FF] to-[#7C3AED]"
  ];

  return (
    <section ref={sectionRef} className="bg-[#0B0F14] py-24">
      <div className="max-w-7xl mx-auto px-8">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#E6EDF3]">
            {t('targetAudience.title')}
          </h2>
          <p className="text-lg text-[#8B949E] max-w-3xl mx-auto mt-4">
            {t('targetAudience.description')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {items.map((item, i) => (
            <div
              key={i}
              className={`group relative p-6 rounded-2xl bg-[#11161D] border-2 border-[#2A2F36] hover:border-[#00D1FF]/50 transition-all duration-300 overflow-hidden h-full flex flex-col items-center text-center ${isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
                }`}
              style={{
                animationDelay: `${i * 100}ms`,
                animationFillMode: 'forwards'
              }}
            >
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${gradients[i]} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

              {/* Content */}
              <div className="relative z-10 flex-1 flex flex-col items-center text-center">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradients[i]} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-[#E6EDF3] group-hover:text-white transition-colors mb-3">
                  {item.title}
                </h3>
                <p className="text-[#8B949E] text-sm leading-relaxed group-hover:text-[#B0B8C0] transition-colors">
                  {item.description}
                </p>
              </div>

              {/* Shine effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}