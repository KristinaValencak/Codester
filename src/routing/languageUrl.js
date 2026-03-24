export const SUPPORTED_LANGUAGES = ["sl", "en"];

export function getUrlLanguage(pathname) {
  const first = (pathname || "/").split("/").filter(Boolean)[0];
  return first === "en" ? "en" : "sl";
}

export function stripLanguagePrefix(pathname) {
  const parts = (pathname || "/").split("/").filter(Boolean);
  if (parts[0] === "en" || parts[0] === "sl") parts.shift();
  return `/${parts.join("/")}`.replace(/\/+$/, "") || "/";
}

export function withLanguagePrefix(lng, pathname) {
  const clean = stripLanguagePrefix(pathname);
  if (lng === "sl") return clean;
  if (lng === "en") return clean === "/" ? "/en" : `/en${clean}`;
  return clean;
}

