import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

export default function TimeCalculatorSection() {
    const { t } = useTranslation();
    const [weeklyHours, setWeeklyHours] = useState('');
    const [results, setResults] = useState(null);
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

    const calculateResults = (hours) => {
        const hoursPerWeek = parseFloat(hours) || 0;
        if (hoursPerWeek <= 0) {
            setResults(null);
            return;
        }

        const hoursPerYear = hoursPerWeek * 52;
        const hoursPerMonth = hoursPerYear / 12;

        const timeSavedPercent = 75;
        const hoursSavedPerYear = hoursPerYear * (timeSavedPercent / 100);
        const hoursSavedPerMonth = hoursPerMonth * (timeSavedPercent / 100);
        const hoursSavedPerWeek = hoursPerWeek * (timeSavedPercent / 100);
        const daysSavedPerYear = hoursSavedPerYear / 8;
        const daysSavedPerMonth = hoursSavedPerMonth / 8;

        setResults({
            hoursPerYear: Math.round(hoursPerYear),
            hoursPerMonth: Math.round(hoursPerMonth * 10) / 10,
            hoursSavedPerYear: Math.round(hoursSavedPerYear),
            hoursSavedPerMonth: Math.round(hoursSavedPerMonth * 10) / 10,
            hoursSavedPerWeek: Math.round(hoursSavedPerWeek * 10) / 10,
            daysSavedPerYear: Math.round(daysSavedPerYear * 10) / 10,
            daysSavedPerMonth: Math.round(daysSavedPerMonth * 10) / 10,
            timeSavedPercent
        });
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setWeeklyHours(value);
        calculateResults(value);
    };

    const AnimatedResult = ({ target, suffix = '', prefix = '', duration = 1500, label }) => {
        const [count, setCount] = useState(0);
        const [hasAnimated, setHasAnimated] = useState(false);

        useEffect(() => {
            if (results && !hasAnimated) {
                setHasAnimated(true);
                const startTime = Date.now();
                const startValue = 0;
                const endValue = target;

                const animate = () => {
                    const now = Date.now();
                    const elapsed = now - startTime;
                    const progress = Math.min(elapsed / duration, 1);

                    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                    const currentValue = startValue + (endValue - startValue) * easeOutQuart;

                    setCount(currentValue);

                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    } else {
                        setCount(endValue);
                    }
                };

                requestAnimationFrame(animate);
            } else if (!results) {
                setCount(0);
                setHasAnimated(false);
            }
        }, [results, target, duration, hasAnimated]);

        if (!results) return null;

        return (
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#11161D] to-[#0B0F14] border-2 border-[#2A2F36] hover:border-[#00D1FF]/50 transition-all duration-300 hover:shadow-[0_0_24px_rgba(0,209,255,0.15)] flex flex-col items-center justify-center text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-[#00D1FF] via-[#7C3AED] to-[#00D1FF] bg-clip-text text-transparent">
                    {prefix}{typeof target === 'number' && target % 1 !== 0 ? count.toFixed(1) : Math.floor(count)}{suffix}
                </div>
                <p className="text-sm text-[#8B949E]">
                    {label}
                </p>
            </div>
        );
    };

    return (
        <section
            ref={sectionRef}
            id="calculator"
            className="py-24 px-8 relative overflow-hidden bg-[#0B0F14]"
        >
            {/* Animirano ozadje */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-br from-[#00D1FF]/10 via-[#7C3AED]/5 to-transparent rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-[#7C3AED]/10 via-[#00D1FF]/5 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }} />
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-[#00D1FF] via-[#7C3AED] to-[#00D1FF] bg-clip-text text-transparent">
                            {t('timeCalculator.title')}
                        </span>
                    </h2>
                    <p className="text-lg text-[#8B949E] max-w-2xl mx-auto">
                        {t('timeCalculator.description')}
                    </p>
                </div>

                {/* Kalkulator */}
                <div className="bg-[#11161D] rounded-2xl p-8 md:p-12 border-2 border-[#2A2F36] mb-12 shadow-[0_0_40px_rgba(0,209,255,0.1)]">
                    <div className="max-w-md mx-auto">
                        <label htmlFor="weekly-hours" className="block text-lg font-semibold text-[#E6EDF3] mb-4 text-center">
                            {t('timeCalculator.input.label')}
                        </label>
                        <div className="relative">
                            <input
                                type="number"
                                id="weekly-hours"
                                value={weeklyHours}
                                onChange={handleInputChange}
                                min="0"
                                step="0.5"
                                className="w-full px-6 py-4 rounded-xl bg-[#0B0F14] border-2 border-[#2A2F36] text-[#E6EDF3] text-2xl font-semibold focus:outline-none focus:border-[#00D1FF] focus:ring-4 focus:ring-[#00D1FF]/20 transition-all text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                            <span className="absolute right-6 top-1/2 -translate-y-1/2 text-[#8B949E] text-xl font-medium">
                                {t('timeCalculator.input.suffix')}
                            </span>
                        </div>
                        {weeklyHours && parseFloat(weeklyHours) > 0 && (
                            <p className="mt-4 text-sm text-[#8B949E] text-center">
                                {t('timeCalculator.input.yearlyInfo', { hours: Math.round(parseFloat(weeklyHours) * 52) })}
                            </p>
                        )}
                    </div>
                </div>

                {/* Rezultati */}
                {results && (
                    <div className={`opacity-0 ${isVisible ? 'animate-fade-in opacity-100' : ''}`} style={{ animationFillMode: 'forwards' }}>
                        <div className="text-center mb-8">
                            <h3 className="text-2xl md:text-3xl font-bold mb-2 text-[#E6EDF3]">
                                {t('timeCalculator.results.title')}
                            </h3>
                            <p className="text-[#8B949E]">
                                {t('timeCalculator.results.description', { percent: results.timeSavedPercent })}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <AnimatedResult
                                target={results.hoursSavedPerYear}
                                suffix={t('timeCalculator.results.suffixes.hours')}
                                duration={2000}
                                label={t('timeCalculator.results.labels.hoursPerYear')}
                            />
                            <AnimatedResult
                                target={results.daysSavedPerYear}
                                suffix={t('timeCalculator.results.suffixes.days')}
                                duration={2000}
                                label={t('timeCalculator.results.labels.daysPerYear')}
                            />
                            <AnimatedResult
                                target={results.hoursSavedPerMonth}
                                suffix={t('timeCalculator.results.suffixes.hours')}
                                duration={2000}
                                label={t('timeCalculator.results.labels.hoursPerMonth')}
                            />
                            <AnimatedResult
                                target={results.daysSavedPerMonth}
                                suffix={t('timeCalculator.results.suffixes.days')}
                                duration={2000}
                                label={t('timeCalculator.results.labels.daysPerMonth')}
                            />
                            <AnimatedResult
                                target={results.hoursSavedPerWeek}
                                suffix={t('timeCalculator.results.suffixes.hours')}
                                duration={2000}
                                label={t('timeCalculator.results.labels.hoursPerWeek')}
                            />
                            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#00D1FF]/10 to-[#7C3AED]/10 border-2 border-[#00D1FF]/30 flex flex-col items-center justify-center">
                                <div className="text-3xl mb-3">🚀</div>
                                <p className="text-center text-[#E6EDF3] font-semibold text-lg">
                                    {t('timeCalculator.results.labels.moreTime')}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}