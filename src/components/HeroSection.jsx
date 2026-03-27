import React, { useState, useEffect, useRef } from 'react';
import '../index.css';
import xLogoImage from '../assets/Logo.webp';
import { useTranslation } from 'react-i18next';
import MobileMenu from './MobileMenu';
import DesktopLanguageSwitcher from './DesktopLanguageSwitcher';

export default function HeroSection() {
  const { t } = useTranslation();
  const [savedTime, setSavedTime] = useState(0);
  const [testCount, setTestCount] = useState(0);
  const [manualBarWidth, setManualBarWidth] = useState(0);
  const [autoBarWidth, setAutoBarWidth] = useState(0);
  const [passedProgress, setPassedProgress] = useState(0);
  const [failedProgress, setFailedProgress] = useState(0);
  const [chartPathLength, setChartPathLength] = useState(0);

  const links = [
    { label: t('hero.navProcess'), id: 'process' },
    { label: t('footer.links.videoTutorials'), id: 'video-vodiči' },
    { label: t('footer.links.pricing'), id: 'pricing' },
    { label: t('hero.navSavings'), id: 'calculator' }
  ];

  useEffect(() => {
    const startTime = performance.now();
    let animationFrameId;

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;

      if (elapsed < 800) {
        const progress = elapsed / 800;
        setSavedTime(Math.min(72.5 * progress, 72.5));
      } else {
        setSavedTime(72.5);
      }

      if (elapsed < 800) {
        const progress = elapsed / 800;
        setTestCount(Math.floor(150 * progress));
      } else {
        setTestCount(150);
      }

      if (elapsed < 600) {
        const progress = elapsed / 600;
        setManualBarWidth(Math.min(100 * progress, 100));
        setAutoBarWidth(Math.min(6 * progress, 6));
      } else {
        setManualBarWidth(100);
        setAutoBarWidth(6);
      }

      if (elapsed < 800) {
        const progress = elapsed / 800;
        setPassedProgress(Math.min(80 * progress, 80));
        setFailedProgress(Math.min(20 * progress, 20));
      } else {
        setPassedProgress(80);
        setFailedProgress(20);
      }

      if (elapsed < 1000) {
        setChartPathLength(Math.min(elapsed / 1000, 1));
      } else {
        setChartPathLength(1);
      }

      if (elapsed < 1000) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  const HorizontalBarComparison = () => {
    const { t } = useTranslation();
    return (
      <div className="w-full">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] text-[#8B949E] font-medium">{t('hero.charts.timeComparison')}</span>
        </div>
        <div className="space-y-2.5">
          {/* Ročno testiranje */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] text-[#E6EDF3]">{t('hero.charts.manualTesting')}</span>
              <span className="text-[10px] text-[#EF4444] font-semibold">3h 20m</span>
            </div>
            <div className="h-4 bg-[#2A2F36] rounded overflow-hidden relative">
              <div
                className="h-full bg-gradient-to-r from-[#EF4444] to-[#DC2626] rounded transition-all duration-1500 ease-out"
                style={{ width: `${manualBarWidth}%` }}
              />
            </div>
          </div>

          {/* Avtomatizirano */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] text-[#E6EDF3]">{t('hero.charts.automatedTesting')}</span>
              <span className="text-[10px] text-[#10B981] font-semibold">12m</span>
            </div>
            <div className="h-4 bg-[#2A2F36] rounded overflow-hidden relative">
              <div
                className="h-full bg-gradient-to-r from-[#10B981] to-[#059669] rounded transition-all duration-1500 ease-out"
                style={{ width: `${autoBarWidth}%` }}
              />
            </div>
          </div>

          {/* Savings indicator */}
          <div className="pt-2 border-t border-[#2A2F36]">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-[#8B949E]">{t('hero.charts.savings')}</span>
              <span className="text-[10px] text-[#00D1FF] font-bold">{t('hero.charts.faster')}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ConfidenceTrendChart = () => {
    const pathRef = useRef(null);
    const [pathLength, setPathLength] = useState(1000);

    // % napak skozi 30 dni (padanje)
    const data = [
      32, 30, 28, 26, 24, 22, 20, 18, 16, 14,
      12, 11, 10, 9, 8, 7, 7, 6, 6, 6,
      6, 6, 6, 6, 6, 6, 6, 6, 6, 6
    ];

    const maxValue = 40;
    const width = 300;
    const height = 110;
    const paddingY = 14;

    const chartHeight = height - paddingY * 2;

    const points = data.map((value, index) => {
      const x = (index / (data.length - 1)) * width;
      const y =
        paddingY +
        chartHeight -
        (value / maxValue) * chartHeight;

      return { x, y };
    });

    const pathData = points
      .map((point, index) =>
        `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`
      )
      .join(" ");

    useEffect(() => {
      if (pathRef.current) {
        const length = pathRef.current.getTotalLength();
        setPathLength(length);
      }
    }, []);

    const currentErrorRate = data[data.length - 1];
    const animatedPathLength = pathLength * chartPathLength;

    return (
      <div className="w-full">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] text-[#8B949E] font-medium">
            {t('hero.charts.fewerErrors')}
          </span>
          <span className="text-[11px] text-[#10B981] font-semibold">
            {currentErrorRate}%
          </span>
        </div>

        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-28"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="errorAreaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Area - animirano */}
          <path
            d={`${pathData} L ${width} ${height - paddingY} L 0 ${height - paddingY} Z`}
            fill="url(#errorAreaGradient)"
            className="transition-opacity duration-1000"
            style={{ opacity: chartPathLength }}
          />

          {/* Line - animirano risanje */}
          <path
            ref={pathRef}
            d={pathData}
            stroke="#10B981"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={pathLength}
            strokeDashoffset={pathLength - animatedPathLength}
            className="transition-all duration-1000 ease-out"
          />

          {/* Zadnja točka poudarjena - animirano */}
          <circle
            cx={points[points.length - 1].x}
            cy={points[points.length - 1].y}
            r="4"
            fill="#10B981"
            className="transition-opacity duration-300"
            style={{ opacity: chartPathLength > 0.9 ? 1 : 0 }}
          />
        </svg>

        <div className="flex items-center justify-between mt-1 text-[9px] text-[#8B949E]">
          <span>{t('hero.charts.last30Days')}</span>
          <span className="text-[#10B981] font-medium">
            -81% {t('hero.charts.errorReduction')}
          </span>
        </div>
      </div>
    );
  };

  const SemiCircleProgress = ({ percentage }) => {
    const strokeWidth = 10;

    const radius = 100;
    const normalizedRadius = radius - strokeWidth;
    const circumference = Math.PI * normalizedRadius;

    const strokeDashoffset =
      circumference - (percentage / 100) * circumference;

    return (
      <div className="relative bg-[#11161D]  rounded-lg p-6 flex items-center justify-center">
        <svg
          viewBox="0 0 200 120"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="semiCircleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00D1FF" />
              <stop offset="100%" stopColor="#7C3AED" />
            </linearGradient>
          </defs>

          {/* Background */}
          <path
            d="M 10 100 A 90 90 0 0 1 190 100"
            fill="none"
            stroke="#2A2F36"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />

          {/* Progress */}
          <path
            d="M 10 100 A 90 90 0 0 1 190 100"
            fill="none"
            stroke="url(#semiCircleGradient)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1500 ease-out"
          />
        </svg>

        <div className="absolute text-center w-full mt-10">
          <div className="text-2xl font-bold text-[#E6EDF3]">
            {percentage.toFixed(1)}%
          </div>
          <div className="text-xs text-[#8B949E] mt-1">
            {t('hero.charts.timeSaved')}
          </div>
        </div>
      </div>
    );
  };

  // Progress bar komponenta
  const ProgressBar = ({ percentage, label, color, animatedPercentage }) => {
    const displayPercentage = animatedPercentage !== undefined ? animatedPercentage : percentage;
    return (
      <div className="w-full">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] text-[#8B949E]">{label}</span>
          <span className="text-[10px] font-semibold" style={{ color }}>
            {displayPercentage.toFixed(1)}%
          </span>
        </div>
        <div className="h-1.5 bg-[#2A2F36] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-800 ease-out"
            style={{
              width: `${displayPercentage}%`,
              background: `linear-gradient(90deg, ${color}, ${color}dd)`,
            }}
          />
        </div>
      </div>
    );
  };

  return (
    <>
      {/* HERO – profesionalna verzija z nav znotraj */}
      <section className="flex flex-col relative overflow-hidden min-h-[80vh] md:min-h-screen bg-[#0B0F14]">
        <header className="w-full border-b border-[#2A2F36] relative z-[100]">

          <div className="flex items-center justify-between px-8 h-[72px] max-w-7xl mx-auto">

            {/* LOGO */}
            <div className="flex items-center group cursor-pointer">
              <img
                src={xLogoImage}
                alt="X Logo"
                className="h-14 w-auto group-hover:scale-110 transition-transform duration-300"
              />
            </div>

            {/* CENTERED NAV */}
            <nav className="hidden lg:flex items-center gap-12 text-sm h-full absolute left-1/2 transform -translate-x-1/2">
              {links.map((link) => (
                <button
                  key={link.id}
                  onClick={() =>
                    document
                      .getElementById(link.id)
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="relative text-[#9CA3AF] hover:text-white transition-colors group"
                >
                  {link.label}

                  {/* underline */}
                  <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-gradient-to-r from-[#00D1FF] to-[#7C3AED] transition-all duration-300 group-hover:w-full"></span>
                </button>
              ))}
            </nav>

            {/* RIGHT SIDE - Language, Contact, Mobile */}
            <div className="flex items-center gap-6 md:gap-6 justify-end md:justify-start">
              {/* language */}
              <DesktopLanguageSwitcher />

              {/* contact */}
              <button
                onClick={() =>
                  document
                    .getElementById("kontaktni-obrazec")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="hidden lg:block px-6 py-2 rounded-xl border border-[#2A2F36] hover:border-[#7C3AED] text-white font-semibold text-sm transition"
              >
                {t("hero.ctaSecondary")}
              </button>

              {/* mobile */}
              <MobileMenu />
            </div>

          </div>

        </header>

        {/* HERO CONTENT - Grid layout */}
        <div className="flex-1 w-full flex items-center relative z-10">
          <div className="max-w-7xl mx-auto px-8 w-full py-10 md:py-0">
            <div className="grid lg:grid-cols-[1.3fr_1fr] gap-8 lg:gap-16 items-center">
              {/* LEVA STRAN - Besedilo - animirano odenkrat */}
              <div className="text-left opacity-0 animate-fade-in" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
                <h1 className="text-[43px] md:text-6xl lg:text-[57px] font-bold leading-[1.1] mb-6">
                  <span
                    className="block opacity-0 animate-slide-up"
                    style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}
                  >
                    {t('hero.title')}{" "}
                    <span className="bg-gradient-to-r from-[#00D1FF] via-[#7C3AED] to-[#00D1FF] bg-clip-text text-transparent">
                      {t('hero.titleHighlight')}
                    </span>
                  </span>


                  <span
                    className="block opacity-0 animate-slide-up text-2xl md:text-4xl lg:text-[36px] font-semibold mt-4"
                    style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}
                  >
                    {t('hero.subtitle')}
                  </span>
                </h1>
                <p className="mt-8 text-base md:text-lg text-[#8B949E] leading-relaxed">
                  {t('hero.description')}
                </p>
                <div className="mt-12 flex flex-nowrap md:flex-wrap gap-2 md:gap-4">
                  <button
                    onClick={() => {
                      document.getElementById('tests')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="flex-1 md:flex-none px-4 md:px-8 py-3 md:py-4 rounded-2xl bg-gradient-to-r from-[#00D1FF] to-[#7C3AED] text-black font-semibold text-sm md:text-base hover:shadow-[0_0_24px_rgba(0,209,255,0.4)] transition-all duration-300 transform hover:scale-105"
                  >
                    {t('hero.ctaPrimary')}
                  </button>
                  <button
                    onClick={() => {
                      document.getElementById('kontaktni-obrazec')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="flex-1 hidden px-4 py-3 rounded-2xl border-2 border-[#2A2F36] hover:border-[#7C3AED] text-white font-semibold text-sm transition-all duration-300 hover:bg-[#7C3AED]/10 whitespace-nowrap"
                  >
                    {t('hero.ctaSecondary')}
                  </button>
                </div>
              </div>

              {/* DESNA STRAN - Grafi in metrike v 2 stolpcih - animirano posebej */}
              <div className="hidden md:block opacity-0 animate-fade-in" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
                <div className="grid grid-cols-2 gap-3">
                  {/* Horizontal bar comparison - Ročno vs Avtomatizirano */}
                  <div className="bg-[#11161D] border border-[#2A2F36] rounded-lg p-3 hover:border-[#00D1FF]/50 transition-colors">
                    <HorizontalBarComparison />
                  </div>

                  {/* Confidence trend chart - Stabilnost skozi čas */}
                  <div className="bg-[#11161D] border border-[#2A2F36] rounded-lg p-3 hover:border-[#10B981]/50 transition-colors">
                    <ConfidenceTrendChart />
                  </div>

                  {/* Prihranjen čas - Moderni polkrog */}
                  <div className="bg-[#11161D] border border-[#2A2F36] rounded-lg p-3 hover:border-[#7C3AED]/50 transition-colors flex items-center justify-center">
                    <SemiCircleProgress percentage={savedTime} />
                  </div>

                  {/* Test rezultati - kompaktno */}
                  <div className="bg-[#11161D] border border-[#2A2F36] rounded-lg p-3 hover:border-[#00D1FF]/50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-semibold text-[#E6EDF3]">{t('hero.charts.lastExecution')}</span>
                      <span className="text-[10px] text-[#8B949E] font-mono">{testCount} {t('hero.charts.steps')}</span>
                    </div>

                    <div className="space-y-2">
                      {/* Progress barji - animirani */}
                      <ProgressBar percentage={80} label={t('hero.charts.passed')} color="#10B981" animatedPercentage={passedProgress} />
                      <ProgressBar percentage={20} label={t('hero.charts.failed')} color="#EF4444" animatedPercentage={failedProgress} />

                      {/* Test summary */}
                      <div className="mt-2 pt-2 border-t border-[#2A2F36]">
                        <div className="font-mono text-[10px] text-[#8B949E] space-y-1">
                          <div className="flex items-center justify-between">
                            <span>{t('hero.charts.scenarios')}</span>
                            <div className="flex gap-1.5">
                              <span className="text-green-400">8</span>
                              <span className="text-red-400">2</span>
                            </div>
                          </div>
                          <div className="text-[#6B7280]">
                            4m45.452s
                          </div>
                        </div>
                      </div>

                      {/* Failed testi */}
                      <div className="mt-2 pt-2 border-t border-[#2A2F36]">
                        <div className="text-[10px] text-[#8B949E] mb-1.5">{t('hero.charts.failedTests')}</div>
                        <div className="space-y-1 font-mono text-[10px]">
                          <div className="flex items-center gap-1.5 text-red-400">
                            <span className="text-red-500">✗</span>
                            <span className="truncate">{t('hero.charts.registrationSuccess')}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-red-400">
                            <span className="text-red-500">✗</span>
                            <span className="truncate">{t('hero.charts.addToCart')}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section >
    </>
  );
}