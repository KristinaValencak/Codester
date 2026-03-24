import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { stripLanguagePrefix, withLanguagePrefix } from "../routing/languageUrl";

export default function DesktopLanguageSwitcher() {
  const { i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const languages = [
    { code: "sl", label: "SL" },
    { code: "en", label: "EN" }
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

  return (
    <div className="hidden lg:flex items-center gap-2 text-sm font-semibold">
      {languages.map((lang, index) => (
        <button
          key={lang.code}
          onClick={() => changeLanguage(lang.code)}
          className={`transition ${
            i18n.language === lang.code
              ? "text-white"
              : "text-[#8B949E] hover:text-white"
          }`}
        >
          {lang.label}
          {index === 0 && <span className="mx-1 text-[#6B7280]">/</span>}
        </button>
      ))}
    </div>
  );
}