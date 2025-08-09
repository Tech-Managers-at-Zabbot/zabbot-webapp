"use client"
import { useEffect, useRef, useState } from 'react';

// Minimal typing for the global keyman object we use in this demo
declare global {
  interface Window {
    keyman?: any;
  }
}

export default function Home() {
  const taRef = useRef<HTMLTextAreaElement | null>(null);
  const [ready, setReady] = useState(false);
  const [source, setSource] = useState<'cloud' | 'local' | 'none'>('none');

  useEffect(() => {
    if (typeof window === 'undefined') return; // SSR guard

    let mounted = true;

    const init = async () => {
      // Wait for Keyman engine to be present
      for (let i = 0; i < 100; i++) {
        if (window.keyman && typeof window.keyman.init === 'function') break;
        await new Promise((r) => setTimeout(r, 30));
      }

      if (!mounted) return;
      if (!window.keyman) {
        console.error('Keyman engine not found — check script src in _app.tsx');
        return;
      }

      // Initialize Keyman and attach automatically to inputs
      try {
        window.keyman.init({ attachType: 'auto' });
      } catch (e) {
        // some Keyman builds don't require parameters
        try { window.keyman.init(); } catch (e) { /* ignore */ }
      }

      // Attach to our textarea explicitly (optional because attachType:auto does it)
      if (taRef.current) {
        try {
          window.keyman.attachToControl(taRef.current);
        } catch (e) {
          // attachToControl may not exist on some builds; ignore safely
        }
      }

      setReady(true);
    };

    init();

    return () => { mounted = false; };
  }, []);

  // Load Yoruba keyboard from Keyman Cloud (recommended):
  const loadYorubaFromCloud = async () => {
    if (!window.keyman) return;

    try {
      // `@yo` asks Keyman Cloud for the default keyboard for language `yo`.
      // This is a KeymanWeb convenience that loads the keyboard from Keyman CDN.
      await window.keyman.addKeyboards('@yo');
      setSource('cloud');
      // Set active keyboard if API available
      try { window.keyman.setActiveKeyboard && window.keyman.setActiveKeyboard('yo'); } catch(e) {}
    } catch (e) {
      console.error('Failed to load Yoruba from cloud', e);
    }
  };

  // Load a local compiled keyboard (if you placed compiled .js into /public/keyboards)
  const loadLocalKeyboard = async () => {
    if (!window.keyman) return;

    try {
      // Example: add a keyboard that you host locally. The compiled keyboard file must
      // register itself or be referenced by filename here. If you have a compiled file
      // that exposes id 'sil_yoruba_dot' you can do:
      await window.keyman.addKeyboards({
        id: 'sil_yoruba_dot',
        name: 'Yorùbá (local compiled)',
        filename: '/keyboards/sil_yoruba_dot.js',
        languages: [{ id: 'yo', name: 'Yorùbá' }],
      });
      setSource('local');
    } catch (e) {
      console.error('Failed to load local keyboard', e);
    }
  };

  return (
    <div style={{ padding: 24, fontFamily: 'system-ui, sans-serif' }}>
      <h1>Keyman + Next.js (TypeScript) — Yorùbá keyboard</h1>

      <p>Keyman engine ready: <strong>{ready ? 'Yes' : 'No'}</strong></p>

      <div style={{ marginBottom: 12 }}>
        <label htmlFor="yorubaText">Type Yorùbá here:</label>
        <br />
        <textarea id="yorubaText" ref={taRef} rows={8} cols={80} placeholder="Start typing in Yorùbá..." style={{ fontSize: 16, padding: 8 }} />
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={loadYorubaFromCloud}>Load Yorùbá from Keyman Cloud</button>
        <button onClick={loadLocalKeyboard}>Load local compiled Yorùbá</button>
        <button onClick={() => {
          try { window.keyman && window.keyman.removeKeyboards && window.keyman.removeKeyboards(); setSource('none'); } catch(e) { console.warn(e); }
        }}>Unload Keyboards</button>
      </div>

      <div style={{ marginTop: 12 }}><strong>Loaded from:</strong> {source}</div>

      <section style={{ marginTop: 24 }}>
        <h2>Notes</h2>
        <ul>
          <li>
            The Keyman Cloud includes multiple Yorùbá keyboards (e.g. <em>Yorùbá Ìrọ̀rùn</em>, <em>Yorùbá with Dot</em>, <em>Yoruba Basic</em>). Loading with <code>addKeyboards('@yo')</code> fetches the default web keyboard for the language from the cloud. citeturn0search1turn2search5
          </li>
          <li>
            If you need a specific keyboard variant, you can either load a compiled keyboard file into <code>/public/keyboards</code> and reference it by filename, or use the Keyman Cloud keyboard ID. The Keyman documentation shows both approaches. citeturn2search4
          </li>
          <li>
            API names change slightly between Keyman versions: some builds expose <code>setActiveKeyboard</code>, others expose APIs under <code>keyman.core</code>. Be defensive in production code.
          </li>
        </ul>
      </section>
    </div>
  );
}