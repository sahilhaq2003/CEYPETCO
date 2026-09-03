import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../i18n/LanguageContext.jsx";

const SCRIPT_ID = "google-translate-script";
const CALLBACK_NAME = "ceypetcoGoogleTranslateInit";

const GoogleTranslate = () => {
  const { setLanguage } = useLanguage();
  const [selected, setSelected] = useState(
    () => localStorage.getItem("ceypetco_google_language") || "en",
  );
  const selectedRef = useRef(selected);

  const applyLanguage = (language, attempts = 0) => {
    const select = document.querySelector(".goog-te-combo");
    if (!select) {
      if (attempts < 20) {
        window.setTimeout(() => applyLanguage(language, attempts + 1), 250);
      }
      return;
    }
    if (language === "en" && !select.querySelector('option[value="en"]')) {
      document.cookie = "googtrans=; Max-Age=0; path=/";
      document.cookie = `googtrans=; Max-Age=0; path=/; domain=.${window.location.hostname}`;
      window.location.reload();
      return;
    }
    select.value = language;
    select.dispatchEvent(new Event("change", { bubbles: true }));
  };

  useEffect(() => {
    setLanguage("en");
    const initialize = () => {
      if (!window.google?.translate?.TranslateElement) return;
      const host = document.getElementById("google_translate_element");
      if (!host) return;
      if (host.childElementCount && document.querySelector(".goog-te-combo")) {
        applyLanguage(selectedRef.current);
        return;
      }
      if (host.childElementCount) host.replaceChildren();
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,si,ta",
          autoDisplay: false,
        },
        "google_translate_element",
      );
      if (selectedRef.current !== "en") {
        applyLanguage(selectedRef.current);
      }
    };
    window[CALLBACK_NAME] = initialize;
    if (window.google?.translate?.TranslateElement) initialize();
    else if (!document.getElementById(SCRIPT_ID)) {
      const script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.src = `https://translate.google.com/translate_a/element.js?cb=${CALLBACK_NAME}`;
      script.async = true;
      document.head.appendChild(script);
    }
  }, [setLanguage]);

  const changeLanguage = (event) => {
    const value = event.target.value;
    selectedRef.current = value;
    setSelected(value);
    localStorage.setItem("ceypetco_google_language", value);
    applyLanguage(value);
  };

  return (
    <>
      <label className="site-language" aria-label="Website language">
        <select value={selected} onChange={changeLanguage} aria-label="Website language">
          <option value="en">English</option>
          <option value="si">සිංහල</option>
          <option value="ta">தமிழ்</option>
        </select>
      </label>
      <div className="google-translate-engine" aria-hidden="true">
        <div id="google_translate_element" />
      </div>
    </>
  );
};

export default GoogleTranslate;
