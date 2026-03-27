import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

export default function SeleniumVideoTutorialsSection() {
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
    const steps = t('videoTutorials.steps', { returnObjects: true });

    return (
        <section
            id="video-vodiči"
            ref={sectionRef}
            className="py-24 px-8 relative overflow-hidden bg-[#0B0F14]"
        >
            {/* Animirano ozadje */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-0 right-1/4 w-[700px] h-[700px] bg-gradient-to-bl from-[#7C3AED]/10 via-[#00D1FF]/5 to-transparent rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-[#00D1FF]/10 via-[#7C3AED]/5 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }} />

                {/* Animirane video ikone */}
                <div className="hidden md:block absolute top-32 right-20 text-6xl text-[#7C3AED]/20 animate-bounce" style={{ animationDuration: '3s' }}>
                    🎬
                </div>
                <div className="hidden md:block absolute bottom-40 left-32 text-5xl text-[#00D1FF]/20 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
                    📹
                </div>

                {/* Animirane črte */}
                <div className="hidden md:block absolute top-48 left-20 w-2 h-40 bg-gradient-to-b from-[#7C3AED]/30 via-[#7C3AED]/10 to-transparent animate-pulse" />
                <div className="hidden md:block absolute bottom-32 right-32 w-2 h-32 bg-gradient-to-b from-[#00D1FF]/30 via-[#00D1FF]/10 to-transparent animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-[#7C3AED] via-[#00D1FF] to-[#7C3AED] bg-clip-text text-transparent">
                            {t('videoTutorials.title')}
                        </span>
                    </h2>
                    <p className="text-lg text-[#8B949E] max-w-2xl mx-auto">
                        {t('videoTutorials.description')}
                    </p>
                </div>

                {/* Proces korakov */}
                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className={`group p-8 rounded-3xl bg-[#11161D] border-2 border-[#2A2F36] hover:border-[#7C3AED]/50 transition-all duration-500 relative overflow-hidden transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                            style={{
                                animationDelay: `${(index + 2) * 150}ms`,
                                animationFillMode: 'forwards'
                            }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-[#7C3AED]/5 via-transparent to-[#00D1FF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="relative z-10">
                                <div className="flex items-start gap-6">
                                    <div className="flex-shrink-0">
                                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#7C3AED] to-[#00D1FF] flex items-center justify-center text-2xl font-bold text-white group-hover:scale-110 transition-transform duration-300">
                                            {step.number}
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-[#E6EDF3] mb-3">
                                            {step.title}
                                        </h3>
                                        <p className="text-[#8B949E] leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-3xl" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}