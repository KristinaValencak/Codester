import React, { lazy, Suspense } from 'react';
import './index.css';
import HeroSection from './components/HeroSection';
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ProblemSection = lazy(() => import('./components/ProblemSection'));
const ServicesSection = lazy(() => import('./components/ServicesSection'));
const SeleniumTestsSection = lazy(() => import('./components/SeleniumTestsSection'));
const SeleniumVideoTutorialsSection = lazy(() => import('./components/SeleniumVideoTutorialsSection'));
const ProcessSection = lazy(() => import('./components/ProcessSection'));
const StatisticsSection = lazy(() => import('./components/StatisticsSection'));
const TargetAudienceSection = lazy(() => import('./components/TargetAudienceSection'));
const FAQSection = lazy(() => import('./components/FAQSection'));
const ContactSection = lazy(() => import('./components/ContactSection'));
const Footer = lazy(() => import('./components/Footer'));
const TimeCalculatorSection = lazy(() => import('./components/TimeCalculatorSection'));
const PriceSection = lazy(() => import('./components/PriceSection'));

const SectionLoader = () => (
  <div className="min-h-[200px] bg-[#0B0F14]" />
);

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    try {
      const target = sessionStorage.getItem("spa:redirect");
      if (target) {
        sessionStorage.removeItem("spa:redirect");
        if (target !== location.pathname + location.search + location.hash) {
          navigate(target, { replace: true });
        }
      }
    } catch {
    }
  }, [navigate, location.pathname, location.search, location.hash]);

  return (
    <div className="min-h-screen bg-[#0B0F14] text-[#E6EDF3] font-sans">
      <HeroSection />
      <Suspense fallback={<SectionLoader />}>
        <ProblemSection />
        <ServicesSection />
        <SeleniumTestsSection />
        <SeleniumVideoTutorialsSection />
        <ProcessSection />
        <StatisticsSection />
        <TimeCalculatorSection />
        <PriceSection />
        <TargetAudienceSection />
        <FAQSection />
        <ContactSection />
        <Footer />
      </Suspense>
    </div>
  );
}