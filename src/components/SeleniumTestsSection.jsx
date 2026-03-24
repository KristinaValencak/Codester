import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

export default function SeleniumTestsSection() {
    const { t } = useTranslation();
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [activeField, setActiveField] = useState(null);
    const animationRef = useRef(null);
    const isVisibleRef = useRef(false);
    const typingIntervalsRef = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        isVisibleRef.current = true;
                    } else {
                        isVisibleRef.current = false;
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
            typingIntervalsRef.current.forEach(interval => clearInterval(interval));
            typingIntervalsRef.current = [];
            if (animationRef.current) {
                clearTimeout(animationRef.current);
            }
        };
    }, []);

    const typeText = (text, setter, callback) => {
        typingIntervalsRef.current.forEach(interval => clearInterval(interval));
        typingIntervalsRef.current = [];

        let index = 0;
        const typeInterval = setInterval(() => {
            if (index < text.length) {
                setter(text.substring(0, index + 1));
                index++;
            } else {
                clearInterval(typeInterval);
                typingIntervalsRef.current = typingIntervalsRef.current.filter(i => i !== typeInterval);
                if (callback) callback();
            }
        }, 100);

        typingIntervalsRef.current.push(typeInterval);
        return typeInterval;
    };

    const startAnimationRef = useRef(null);

    startAnimationRef.current = () => {
        typingIntervalsRef.current.forEach(interval => clearInterval(interval));
        typingIntervalsRef.current = [];
        if (animationRef.current) {
            clearTimeout(animationRef.current);
        }

        setIsAnimating(true);
        setName('');
        setEmail('');
        setPassword('');
        setIsLoggedIn(false);
        setShowSuccess(false);
        setActiveField(null);

        const nameText = t('selenium.form.namePlaceholder') === 'Vaše ime' ? 'Janez Novak' : 'John Doe';
        animationRef.current = setTimeout(() => {
            setActiveField('name');
            typeText(nameText, setName, () => {
                const emailText = t('selenium.form.emailPlaceholder') === 'vasa@email.si' ? 'janez.novak@email.si' : 'john.doe@email.com';
                animationRef.current = setTimeout(() => {
                    setActiveField('email');
                    typeText(emailText, setEmail, () => {
                        const passwordText = 'geslo123';
                        animationRef.current = setTimeout(() => {
                            setActiveField('password');
                            typeText(passwordText, setPassword, () => {
                                animationRef.current = setTimeout(() => {
                                    setActiveField('button');
                                    animationRef.current = setTimeout(() => {
                                        setIsLoggedIn(true);
                                        setShowSuccess(true);
                                        setActiveField(null);
                                        animationRef.current = setTimeout(() => {
                                            setShowSuccess(false);
                                            setIsLoggedIn(false);
                                            setIsAnimating(false);
                                            animationRef.current = setTimeout(() => {
                                                if (isVisibleRef.current && startAnimationRef.current) {
                                                    startAnimationRef.current();
                                                }
                                            }, 2000);
                                        }, 3000);
                                    }, 500);
                                }, 500);
                            });
                        }, 500);
                    });
                }, 500);
            });
        }, 1000);
    };

    useEffect(() => {
        if (isVisible && !isAnimating) {
            const timer = setTimeout(() => {
                if (startAnimationRef.current) {
                    startAnimationRef.current();
                }
            }, 500);
            return () => {
                clearTimeout(timer);
            };
        }
    }, [isVisible, isAnimating]);

    return (
        <section
            id="tests"
            ref={sectionRef}
            className="py-24 px-8 relative overflow-hidden bg-[#0B0F14]"
        >
            {/* Animirano ozadje */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-br from-[#00D1FF]/10 via-[#7C3AED]/5 to-transparent rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-[#7C3AED]/10 via-[#00D1FF]/5 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }} />

                {/* Animirane test ikone */}
                <div className="hidden md:block absolute top-20 left-20 text-6xl text-[#00D1FF]/20 animate-bounce" style={{ animationDuration: '3s' }}>
                    ✓
                </div>
                <div className="hidden md:block absolute top-40 right-32 text-5xl text-[#7C3AED]/20 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
                    ✓
                </div>
                <div className="hidden md:block absolute bottom-40 left-1/4 text-5xl text-[#00D1FF]/15 animate-bounce" style={{ animationDuration: '5s', animationDelay: '2s' }}>
                    ✓
                </div>

                {/* Animirane črte - test poteki */}
                <div className="hidden md:block absolute top-32 left-20 w-2 h-40 bg-gradient-to-b from-[#00D1FF]/30 via-[#00D1FF]/10 to-transparent animate-pulse" />
                <div className="hidden md:block absolute top-48 right-32 w-2 h-32 bg-gradient-to-b from-[#7C3AED]/30 via-[#7C3AED]/10 to-transparent animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-[#00D1FF] via-[#7C3AED] to-[#00D1FF] bg-clip-text text-transparent">
                            {t('selenium.title')}
                        </span>
                    </h2>
                    <p className="text-lg text-[#8B949E] max-w-2xl mx-auto">
                        {t('selenium.description')}
                    </p>
                </div>

                {/* Glavna vsebina */}
                <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                    {/* Leva stran - opis */}
                    <div className={`space-y-6 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                        <div className="p-8 rounded-3xl bg-[#11161D] border-2 border-[#2A2F36] hover:border-[#00D1FF]/50 transition-all duration-300 group">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="text-4xl">🤖</div>
                                <div>
                                    <h3 className="text-xl font-bold text-[#E6EDF3] mb-3">
                                        {t('selenium.insteadOfManual.title')}
                                    </h3>
                                    <p className="text-[#8B949E] leading-relaxed">
                                        {t('selenium.insteadOfManual.description')}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 rounded-3xl bg-[#11161D] border-2 border-[#2A2F36] hover:border-[#7C3AED]/50 transition-all duration-300 group">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="text-4xl">⚡</div>
                                <div>
                                    <h3 className="text-xl font-bold text-[#E6EDF3] mb-3">
                                        {t('selenium.howItWorks.title')}
                                    </h3>
                                    <p className="text-[#8B949E] leading-relaxed">
                                        {t('selenium.howItWorks.description')}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 rounded-3xl bg-gradient-to-br from-[#11161D] to-[#0B0F14] border-2 border-[#2A2F36] hover:border-[#00D1FF]/50 transition-all duration-300 group relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#00D1FF]/5 via-transparent to-[#7C3AED]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="relative z-10">
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="text-4xl">📊</div>
                                    <div>
                                        <h3 className="text-xl font-bold text-[#E6EDF3] mb-3">
                                            {t('selenium.clearReports.title')}
                                        </h3>
                                        <p className="text-[#8B949E] leading-relaxed">
                                            {t('selenium.clearReports.description')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Desna stran - interaktivni browser mockup */}
                    <div className={`relative transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                        <div className="relative">
                            {/* Interaktivni browser mockup */}
                            <div className="rounded-3xl bg-[#11161D] border-2 border-[#2A2F36] p-6 shadow-2xl">
                                {/* Browser bar */}
                                <div className="flex items-center gap-2 mb-4 pb-4 border-b border-[#2A2F36]">
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-[#2A2F36]" />
                                        <div className="w-3 h-3 rounded-full bg-[#2A2F36]" />
                                        <div className="w-3 h-3 rounded-full bg-[#2A2F36]" />
                                    </div>
                                    <div className="flex-1 mx-4 h-8 rounded-lg bg-[#0B0F14] border border-[#2A2F36] flex items-center px-4">
                                        <span className="text-xs text-[#8B949E]">{t('selenium.url')}</span>
                                    </div>
                                </div>

                                {/* Animirana aplikacija - Selenium test */}
                                <div className="min-h-[400px] bg-[#0B0F14] rounded-xl p-6 relative">
                                    {!isLoggedIn ? (
                                        <div className="space-y-6 max-w-md mx-auto md:max-w-none">
                                            <h3 className="text-xl font-bold text-[#E6EDF3] mb-6 text-center">{t('selenium.form.title')}</h3>

                                            {/* Name input */}
                                            <div className="relative">
                                                <label className="block text-sm text-[#8B949E] mb-2">{t('selenium.form.name')}</label>
                                                <input
                                                    type="text"
                                                    value={name}
                                                    readOnly
                                                    placeholder={t('selenium.form.namePlaceholder')}
                                                    className={`w-full px-4 py-3 rounded-lg bg-[#11161D] border-2 text-[#E6EDF3] placeholder-[#8B949E] focus:outline-none transition-all duration-300 ${activeField === 'name'
                                                        ? 'border-[#00D1FF] shadow-[0_0_20px_rgba(0,209,255,0.3)]'
                                                        : 'border-[#2A2F36]'
                                                        }`}
                                                />
                                                {activeField === 'name' && (
                                                    <div className="absolute right-4 top-10 w-2 h-5 bg-[#00D1FF] animate-pulse" style={{ animationDuration: '1s' }} />
                                                )}
                                            </div>

                                            {/* Email input */}
                                            <div className="relative">
                                                <label className="block text-sm text-[#8B949E] mb-2">{t('selenium.form.email')}</label>
                                                <input
                                                    type="email"
                                                    value={email}
                                                    readOnly
                                                    placeholder={t('selenium.form.emailPlaceholder')}
                                                    className={`w-full px-4 py-3 rounded-lg bg-[#11161D] border-2 text-[#E6EDF3] placeholder-[#8B949E] focus:outline-none transition-all duration-300 ${activeField === 'email'
                                                        ? 'border-[#00D1FF] shadow-[0_0_20px_rgba(0,209,255,0.3)]'
                                                        : 'border-[#2A2F36]'
                                                        }`}
                                                />
                                                {activeField === 'email' && (
                                                    <div className="absolute right-4 top-10 w-2 h-5 bg-[#00D1FF] animate-pulse" style={{ animationDuration: '1s' }} />
                                                )}
                                            </div>

                                            {/* Password input */}
                                            <div className="relative">
                                                <label className="block text-sm text-[#8B949E] mb-2">{t('selenium.form.password')}</label>
                                                <input
                                                    type="password"
                                                    value={password}
                                                    readOnly
                                                    placeholder={t('selenium.form.passwordPlaceholder')}
                                                    className={`w-full px-4 py-3 rounded-lg bg-[#11161D] border-2 text-[#E6EDF3] placeholder-[#8B949E] focus:outline-none transition-all duration-300 ${activeField === 'password'
                                                        ? 'border-[#00D1FF] shadow-[0_0_20px_rgba(0,209,255,0.3)]'
                                                        : 'border-[#2A2F36]'
                                                        }`}
                                                />
                                                {activeField === 'password' && (
                                                    <div className="absolute right-4 top-10 w-2 h-5 bg-[#00D1FF] animate-pulse" style={{ animationDuration: '1s' }} />
                                                )}
                                            </div>

                                            {/* Register button */}
                                            <button
                                                disabled
                                                className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${activeField === 'button'
                                                    ? 'bg-gradient-to-r from-[#00D1FF] to-[#7C3AED] text-black scale-105 shadow-[0_0_30px_rgba(0,209,255,0.5)]'
                                                    : 'bg-gradient-to-r from-[#00D1FF] to-[#7C3AED] text-black opacity-90'
                                                    }`}
                                            >
                                                {t('selenium.form.button')}
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="space-y-6">
                                            {showSuccess && (
                                                <div className="p-4 rounded-xl bg-gradient-to-r from-[#00D1FF]/10 to-[#7C3AED]/10 border-2 border-[#00D1FF]/30 flex items-center justify-center gap-3 mb-6 animate-pulse">
                                                    <span className="text-[#00D1FF] font-semibold">{t('selenium.form.success')}</span>
                                                </div>
                                            )}

                                            <div className="text-center py-8">
                                                <div className="mb-4">
                                                    <svg
                                                        className="w-16 h-16 mx-auto text-green-500"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                        strokeWidth="2.5"
                                                    >
                                                        <circle cx="12" cy="12" r="10" stroke="currentColor" />
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M8 12l3 3 5-6"
                                                        />
                                                    </svg>
                                                </div>
                                                <h3 className="text-2xl font-bold text-[#E6EDF3] mb-2">{t('selenium.form.welcome', { name })}</h3>
                                                <p className="text-[#8B949E] mb-6">{t('selenium.form.welcomeDescription')}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}