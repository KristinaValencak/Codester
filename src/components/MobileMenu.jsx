import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { stripLanguagePrefix, withLanguagePrefix } from "../routing/languageUrl";

export default function MobileMenu() {
    const { i18n, t } = useTranslation();
    const [open, setOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const links = [
        { label: t("process.title"), id: "process" },
        { label: t("footer.links.pricing"), id: "pricing" },
        { label: t("footer.links.videoTutorials"), id: "video-vodiči" },
        { label: t("hero.navLink"), id: "tests" },
        { label: t('hero.navSavings'), id: 'calculator' },
        { label: t("footer.links.faq"), id: "faq" },
    ];

    const languages = [
        { code: "sl", name: "SL" },
        { code: "en", name: "EN" },
    ];

    const changeLanguage = (lng) => {
        const basePath = stripLanguagePrefix(location.pathname);
        const nextPath = withLanguagePrefix(lng, basePath);
        navigate(
            {
                pathname: nextPath,
                search: location.search,
                hash: location.hash,
            },
            { replace: false }
        );
        i18n.changeLanguage(lng);
        localStorage.setItem("language", lng);
    };

    const scrollTo = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        setOpen(false);
    };

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "unset";
    }, [open]);

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") setOpen(false);
        };

        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, []);

    return (
        <>
            {/* hamburger */}
            <button
                onClick={() => setOpen(true)}
                className="lg:hidden text-white p-3 hover:bg-[#2A2F36] rounded-lg transition -ml-1"
                aria-label="Open menu"
                style={{ marginRight: '-1rem' }}
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>

            {/* overlay */}
            <div
                className={`fixed inset-0 z-[9999] transition ${open ? "pointer-events-auto" : "pointer-events-none"
                    }`}
            >
                {/* background */}
                <div
                    onClick={() => setOpen(false)}
                    className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity ${open ? "opacity-100" : "opacity-0"
                        }`}
                />

                {/* menu panel */}
                <div
                    className={`absolute right-0 top-0 h-full w-[85%] max-w-sm bg-[#0B0F14] shadow-2xl transform transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"
                        }`}
                >
                    <div className="p-6 flex flex-col h-full">

                        {/* header */}
                        <div className="flex justify-end mb-8">
                            <button
                                onClick={() => setOpen(false)}
                                className="p-2 hover:bg-[#2A2F36] rounded-lg text-white transition"
                                aria-label="Close menu"
                            >
                                ✕
                            </button>
                        </div>

                        {/* nav */}
                        <nav className="flex flex-col gap-2">

                            {links.map((link) => (
                                <button
                                    key={link.id}
                                    onClick={() => scrollTo(link.id)}
                                    className="text-left px-4 py-3 rounded-lg text-lg text-[#E6EDF3] hover:bg-[#2A2F36] hover:text-[#00D1FF] transition"
                                >
                                    {link.label}
                                </button>
                            ))}

                            {/* CTA */}
                            <button
                                onClick={() => scrollTo("kontaktni-obrazec")}
                                className="mt-4 px-4 py-3 rounded-xl bg-gradient-to-r from-[#00D1FF] to-[#7C3AED] text-black font-semibold hover:shadow-[0_0_20px_rgba(0,209,255,0.35)] transition"
                            >
                                {t("hero.ctaSecondary")}
                            </button>
                        </nav>

                        {/* spacer */}
                        <div className="flex-1" />

                        {/* language */}
                        <div className="border-t border-[#2A2F36] pt-6">
                            <div className="text-xs text-[#8B949E] mb-3 uppercase tracking-wider">
                                {t("common.language")}
                            </div>

                            <div className="flex gap-2">
                                {languages.map((lang) => (
                                    <button
                                        key={lang.code}
                                        onClick={() => changeLanguage(lang.code)}
                                        className={`px-3 py-1.5 rounded-md text-sm font-semibold transition ${i18n.language === lang.code
                                            ? "bg-[#7C3AED] text-white"
                                            : "text-[#8B949E] hover:text-white"
                                            }`}
                                    >
                                        {lang.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}