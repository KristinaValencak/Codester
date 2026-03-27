import React, { useEffect, useMemo } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import i18n from "../i18n/config";
import { getUrlLanguage, stripLanguagePrefix, withLanguagePrefix } from "./languageUrl";

const SEO = {
  sl: {
    title: "Avtomatizirano testiranje spletnih aplikacij | QA avtomatizacija | Codester",
    description:
      "Avtomatizirano testiranje spletnih aplikacij (E2E) za podjetja v Sloveniji. Zanesljivi avtomatizirani testi, CI/CD integracija, manj napak po nadgradnjah in profesionalni video vodiči uporabe sistema.",
    ogTitle: "Avtomatizirano testiranje spletnih aplikacij | Codester",
    ogDescription:
      "Zanesljivi avtomatizirani testi za spletne aplikacije in profesionalni video vodiči uporabe sistema. Manj napak po nadgradnjah in stabilnejši razvoj.",
  },
  en: {
    title: "Automated web app testing | QA automation | Codester",
    description:
      "Automated E2E testing for web applications. Reliable automated tests, CI/CD integration, fewer regressions after releases, and professional video tutorials.",
    ogTitle: "Automated web app testing | Codester",
    ogDescription:
      "Reliable automated tests for web apps and professional video tutorials. Fewer regressions after releases and a more stable development cycle.",
  },
};

export default function LanguageLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const urlLng = useMemo(() => getUrlLanguage(location.pathname), [location.pathname]);
  const basePathname = useMemo(
    () => stripLanguagePrefix(location.pathname),
    [location.pathname]
  );

  useEffect(() => {
    const canonicalPath =
      urlLng === "en"
        ? withLanguagePrefix("en", basePathname)
        : basePathname;

    const current = location.pathname || "/";
    if (canonicalPath !== current) {
      navigate(
        {
          pathname: canonicalPath,
          search: location.search,
          hash: location.hash,
        },
        { replace: true }
      );
      return;
    }

    if (i18n.language !== urlLng) {
      i18n.changeLanguage(urlLng);
      localStorage.setItem("language", urlLng);
    }
  }, [urlLng, basePathname, location.pathname, location.search, location.hash, navigate]);

  const seo = SEO[urlLng] ?? SEO.sl;
  const origin = typeof window !== "undefined" ? window.location.origin : "https://codester.si";

  const slUrl = `${origin}${basePathname === "/" ? "/" : basePathname}`;
  const enPath = withLanguagePrefix("en", basePathname);
  const enUrl = `${origin}${enPath === "/" ? "/en" : enPath}`;
  const canonicalUrl = urlLng === "en" ? enUrl : slUrl;

  return (
    <>
      <Helmet>
        <html lang={urlLng} />
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="robots" content="index, follow" />

        <meta property="og:site_name" content="Codester" />
        <meta property="og:title" content={seo.ogTitle} />
        <meta property="og:description" content={seo.ogDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={`${origin}/codester.jpg`} />

        <link rel="canonical" href={canonicalUrl} />
        <link rel="alternate" hrefLang="sl" href={slUrl} />
        <link rel="alternate" hrefLang="en" href={enUrl} />
        <link rel="alternate" hrefLang="x-default" href={slUrl} />
      </Helmet>
      <Outlet />
    </>
  );
}

