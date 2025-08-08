import { useEffect, useRef } from "react";

export default function KeymanToggleLazy() {
  const keymanLoaded = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleFocus = (event: Event) => {
      const target = event.target as HTMLInputElement | HTMLTextAreaElement;
      if (!target.classList.contains("keyman-enabled")) return;

      if (!keymanLoaded.current) {
        keymanLoaded.current = true;
        loadKeyman(() => {
          attachKeymanTo(target);
        });
      } else {
        attachKeymanTo(target);
      }
    };

    document.addEventListener("focusin", handleFocus);
    return () => {
      document.removeEventListener("focusin", handleFocus);
    };
  }, []);

  function loadKeyman(callback: () => void) {
    // Load Keyman CSS
    const css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = "https://s.keyman.com/kmw/engine/18.0.238/kmwuitoggle.css";
    document.head.appendChild(css);

    // Load engine
    const engineScript = document.createElement("script");
    engineScript.src = "https://s.keyman.com/kmw/engine/18.0.238/keymanweb.js";
    engineScript.defer = true;
    engineScript.onload = () => {
      // Load toggle UI after engine
      const toggleScript = document.createElement("script");
      toggleScript.src =
        "https://s.keyman.com/kmw/engine/18.0.238/kmwuitoggle.js";
      toggleScript.defer = true;
      toggleScript.onload = () => {
        initKeyman(callback);
      };
      document.body.appendChild(toggleScript);
    };
    document.body.appendChild(engineScript);
  }

  function initKeyman(callback: () => void) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const km = window.keyman;
    if (!km) return;

    km.init({ attachType: "manual" }).then(() => {
      km.addKeyboards("@en"); // English
      km.addKeyboards("@yo"); // Yoruba
      callback();
    });
  }

  function attachKeymanTo(element: HTMLInputElement | HTMLTextAreaElement) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const km = window.keyman;
    if (!km) return;
    km.attachToControl(element);
  }

  return null;
}
