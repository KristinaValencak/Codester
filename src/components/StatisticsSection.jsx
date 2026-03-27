import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

export default function StatisticsSection() {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Intersection Observer za animacijo ob prikazu
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
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

  // Komponenta za animirano število
  const AnimatedNumber = ({ target, suffix = '', prefix = '', duration = 2000, description }) => {
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
      if (isVisible && !hasAnimated) {
        setHasAnimated(true);
        const startTime = Date.now();
        const startValue = 0;
        const endValue = target;

        const animate = () => {
          const now = Date.now();
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);

          // Easing funkcija za gladek potek
          const easeOutQuart = 1 - Math.pow(1 - progress, 4);
          const currentValue = Math.floor(startValue + (endValue - startValue) * easeOutQuart);

          setCount(currentValue);

          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            setCount(endValue);
          }
        };

        requestAnimationFrame(animate);
      }
    }, [isVisible, target, duration, hasAnimated]);

    return (
      <div className="flex flex-col items-center">
        <div className="text-5xl md:text-6xl font-bold mb-3 bg-gradient-to-r from-[#00D1FF] via-[#7C3AED] to-[#00D1FF] bg-clip-text text-transparent">
          {prefix}{count}{suffix}
        </div>
        <p className="text-center text-[#8B949E] text-sm md:text-base leading-relaxed max-w-xs">
          {description}
        </p>
      </div>
    );
  };

  // Uporabimo prevode iz JSON datoteke
  const statistics = t('statistics.items', { returnObjects: true });

  return (
    <section
      ref={sectionRef}
      className="py-24 px-8 relative overflow-hidden bg-[#0B0F14]"
    >
      {/* Animirano ozadje */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gradient-to-br from-[#00D1FF]/10 via-[#7C3AED]/5 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-tl from-[#7C3AED]/10 via-[#00D1FF]/5 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
          <span className="bg-gradient-to-r from-[#00D1FF] via-[#7C3AED] to-[#00D1FF] bg-clip-text text-transparent">
            {t('statistics.title')}
          </span>
        </h2>
        <p className="text-center text-lg text-[#8B949E] mb-16 max-w-2xl mx-auto">
          {t('statistics.description')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {statistics.map((stat, index) => (
            <AnimatedNumber
              key={index}
              target={stat.target}
              suffix={stat.suffix}
              duration={2000}
              description={stat.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}