import 'globals.css';
import type { AppProps } from 'next/app';
import Script from 'next/script';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* Keyman engine: pinned to a specific version from the CDN. Update if needed. */}
      <Script
        src="https://keymanweb.com/api/keymanweb.js"
        strategy="beforeInteractive"
      />

      {/* Optionally load a local compiled Yoruba keyboard file (if you generated one). */}
      {/* <Script src="/keyboards/sil_yoruba_dot.js" strategy="beforeInteractive"/> */}

      <Component {...pageProps} />
    </>
  );
}