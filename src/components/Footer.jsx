import React from 'react';
import xLogoImage from '../assets/Logo.webp';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const links = [
    { label: t('footer.links.howItWorks'), id: 'tests' },
    { label: t('footer.links.videoTutorials'), id: 'video-vodiči' },
    { label: t('footer.links.pricing'), id: 'pricing' },
    { label: t('footer.links.faq'), id: 'faq' }
  ];

  return (
    <footer className="border-t border-[#2A2F36] bg-[#0B0F14] py-12 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Leva stran - Logo, stavek, kontakt */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <img
                src={xLogoImage}
                alt="Codester Logo"
                className="h-10 md:h-12 w-auto"
                width="120"
                height="120"
                loading="lazy"
              />
            </div>
            <p className="text-[#8B949E] text-sm leading-relaxed max-w-md">
              {t('footer.description')}
            </p>
            <div className="space-y-2 mt-6">
              <a
                href="tel:+38612345678"
                className="flex items-center gap-2 text-[#8B949E] hover:text-[#00D1FF] transition-colors text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +386 31 663 728
              </a>
              <a
                href="mailto:info@codester.si"
                className="flex items-center gap-2 text-[#8B949E] hover:text-[#00D1FF] transition-colors text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                info@codester.si
              </a>
              {/* <a
                href="https://www.linkedin.com/company/codester/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#8B949E] hover:text-[#00D1FF] transition-colors text-sm"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a> */}
            </div>

          </div>

          <div className="md:text-right md:flex md:flex-col md:items-end md:pt-[56px]">
            <h3 className="text-[#E6EDF3] font-semibold mb-4 text-sm uppercase tracking-wider">
              {t('footer.navigation')}
            </h3>
            <nav className="flex flex-col md:items-end gap-3">
              {links.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-[#8B949E] hover:text-[#00D1FF] transition-colors text-sm text-left md:text-right hover:translate-x-1 md:hover:-translate-x-1 transition-transform"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-[#2A2F36] text-center text-[#5B636E] text-sm">
          {t('footer.copyright')}
        </div>
      </div>
    </footer>
  );
}
