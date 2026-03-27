import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

export default function FAQSection() {
    const { t } = useTranslation();
    const [openIndex, setOpenIndex] = useState(null);
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

    const toggleQuestion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    // Uporabimo prevode iz JSON datoteke
    const faqs = t('faq.questions', { returnObjects: true });

    // Razdelimo FAQ v dva stolpca
    const leftColumn = faqs.slice(0, Math.ceil(faqs.length / 2));
    const rightColumn = faqs.slice(Math.ceil(faqs.length / 2));

    return (
        <section ref={sectionRef} id="faq" className="py-24 px-8 relative overflow-hidden bg-[#0B0F14]">
            {/* Animirano ozadje */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-br from-[#00D1FF]/10 via-[#7C3AED]/5 to-transparent rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-[#7C3AED]/10 via-[#00D1FF]/5 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }} />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-[#00D1FF] via-[#7C3AED] to-[#00D1FF] bg-clip-text text-transparent">
                            {t('faq.title')}
                        </span>
                    </h2>
                    <p className="text-lg text-[#8B949E] max-w-2xl mx-auto">
                        {t('faq.subtitle')}
                    </p>
                </div>

                {/* FAQ Items - dva stolpca */}
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Levi stolpec */}
                    <div className="space-y-4">
                        {leftColumn.map((faq, index) => {
                            const globalIndex = index;
                            return (
                                <div
                                    key={globalIndex}
                                    className={`group rounded-2xl bg-[#11161D] border-2 border-[#2A2F36] overflow-hidden transition-all duration-300 hover:border-[#00D1FF]/50 ${isVisible
                                        ? 'opacity-100 translate-x-0'
                                        : 'opacity-0 -translate-x-10'
                                        }`}
                                    style={{
                                        animationDelay: `${globalIndex * 100}ms`,
                                        animationFillMode: 'forwards'
                                    }}
                                >
                                    {/* Question */}
                                    <button
                                        onClick={() => toggleQuestion(globalIndex)}
                                        className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                                    >
                                        <h3 className="text-lg font-semibold text-[#E6EDF3] group-hover:text-white transition-colors flex-1">
                                            {faq.question}
                                        </h3>
                                        <div className={`flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-[#00D1FF]/20 to-[#7C3AED]/20 flex items-center justify-center transition-transform duration-300 ${openIndex === globalIndex ? 'rotate-180' : ''}`}>
                                            <svg
                                                className="w-5 h-5 text-[#00D1FF]"
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
                                    </button>

                                    {/* Answer */}
                                    <div
                                        className={`overflow-hidden transition-all duration-300 ${openIndex === globalIndex ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                            }`}
                                    >
                                        <div className="px-6 pb-5 pt-0">
                                            <p className="text-[#8B949E] text-sm leading-relaxed">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Desni stolpec */}
                    <div className="space-y-4">
                        {rightColumn.map((faq, index) => {
                            const globalIndex = index + Math.ceil(faqs.length / 2);
                            return (
                                <div
                                    key={globalIndex}
                                    className={`group rounded-2xl bg-[#11161D] border-2 border-[#2A2F36] overflow-hidden transition-all duration-300 hover:border-[#00D1FF]/50 ${isVisible
                                        ? 'opacity-100 translate-x-0'
                                        : 'opacity-0 translate-x-10'
                                        }`}
                                    style={{
                                        animationDelay: `${globalIndex * 100}ms`,
                                        animationFillMode: 'forwards'
                                    }}
                                >
                                    {/* Question */}
                                    <button
                                        onClick={() => toggleQuestion(globalIndex)}
                                        className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                                    >
                                        <h3 className="text-lg font-semibold text-[#E6EDF3] group-hover:text-white transition-colors flex-1">
                                            {faq.question}
                                        </h3>
                                        <div className={`flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-[#00D1FF]/20 to-[#7C3AED]/20 flex items-center justify-center transition-transform duration-300 ${openIndex === globalIndex ? 'rotate-180' : ''}`}>
                                            <svg
                                                className="w-5 h-5 text-[#00D1FF]"
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
                                    </button>

                                    {/* Answer */}
                                    <div
                                        className={`overflow-hidden transition-all duration-300 ${openIndex === globalIndex ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                            }`}
                                    >
                                        <div className="px-6 pb-5 pt-0">
                                            <p className="text-[#8B949E] text-sm leading-relaxed">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}