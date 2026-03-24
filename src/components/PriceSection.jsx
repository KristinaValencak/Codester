import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

export default function PricingSection() {
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
    const packages = t('pricing.packages', { returnObjects: true });

    // Dodelimo popular flag (Growth paket je popular)
    const packagesWithPopular = packages.map((pkg, index) => ({
        ...pkg,
        popular: index === 1, // Growth paket (index 1) je popular
        gradient: "from-[#7C3AED] via-[#00D1FF] to-[#7C3AED]" // Gradient ostane enak
    }));

    return (
        <section
            ref={sectionRef}
            id="pricing"
            className="py-24 px-8 relative overflow-hidden bg-[#0B0F14]"
        >
            {/* Animirano ozadje */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-br from-[#00D1FF]/10 via-[#7C3AED]/5 to-transparent rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-[#7C3AED]/10 via-[#00D1FF]/5 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }} />
                <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-gradient-to-r from-[#00D1FF]/8 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '2s' }} />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-[#00D1FF] via-[#7C3AED] to-[#00D1FF] bg-clip-text text-transparent">
                            {t('pricing.title')}
                        </span>
                    </h2>
                    <p className="text-lg text-[#8B949E] max-w-2xl mx-auto">
                        {t('pricing.subtitle')}
                    </p>
                </div>

                {/* Paketi */}
                <div className="grid md:grid-cols-3 gap-6 md:gap-8 items-stretch">
                    {packagesWithPopular.map((pkg, index) => (
                        <div
                            key={index}
                            className={`group relative rounded-3xl overflow-hidden transition-all duration-500 ${isVisible
                                ? 'opacity-100 translate-y-0'
                                : 'opacity-0 translate-y-10'
                                }`}
                            style={{
                                animationDelay: `${index * 150}ms`,
                                animationFillMode: 'forwards'
                            }}
                        >
                            {/* Glavna kartica */}
                            <div
                                className={`relative h-full p-6 rounded-3xl border-2 transition-all duration-300 flex flex-col ${pkg.popular
                                    ? 'bg-gradient-to-br from-[#11161D] to-[#0B0F14] border-[#2A2F36] shadow-[0_0_40px_rgba(124,58,237,0.3)] hover:border-[#00D1FF]/50'
                                    : 'bg-[#11161D] border-[#2A2F36] hover:border-[#00D1FF]/50'
                                    }`}
                            >

                                {/* Gradient overlay on hover */}
                                <div
                                    className={`absolute inset-0 bg-gradient-to-br ${pkg.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-3xl`}
                                />

                                {/* Vsebina */}
                                <div className="relative z-10 flex flex-col flex-grow">
                                    {/* Ikona in naslov */}
                                    <div className="text-center mb-4">
                                        <h3 className="text-xl font-bold text-[#E6EDF3] mb-2">
                                            {pkg.name}
                                        </h3>
                                        <p className="text-[#8B949E] text-sm">{pkg.description}</p>
                                    </div>

                                    {/* Cena */}
                                    <div className="text-center mb-6 pb-6 border-b border-[#2A2F36]">
                                        <div className="flex items-baseline justify-center gap-2">
                                            <span
                                                className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${pkg.gradient} bg-clip-text text-transparent pb-2 inline-block leading-tight`}
                                            >
                                                {pkg.price}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Funkcionalnosti */}
                                    <ul className="space-y-3 mb-6 flex-grow">
                                        {pkg.features.map((feature, idx) => (
                                            <li
                                                key={idx}
                                                className="flex items-start gap-3 group/item"
                                            >
                                                <div
                                                    className={`flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br ${pkg.gradient} flex items-center justify-center mt-0.5 group-hover/item:scale-110 transition-transform`}
                                                >
                                                    <svg
                                                        className="w-3 h-3 text-white"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={3}
                                                            d="M5 13l4 4L19 7"
                                                        />
                                                    </svg>
                                                </div>
                                                <span className="text-[#E6EDF3] text-sm leading-relaxed flex-1">
                                                    {feature}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Shine effect */}
                                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-3xl" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Opomba */}
                <div className="mt-16 text-center">
                    <div className="inline-block p-6 rounded-2xl bg-[#11161D] border-2 border-[#2A2F36] max-w-2xl">
                        <p className="text-[#8B949E] text-sm leading-relaxed">
                            <span className="text-[#00D1FF] font-semibold">{t('pricing.note.flexiblePrices')}</span> {t('pricing.note.flexiblePricesText')}
                            <br /><br />
                            <span className="text-[#00D1FF] font-semibold">{t('pricing.note.videoTutorials')}</span> {t('pricing.note.videoTutorialsText')}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}