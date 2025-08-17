// hooks/useRouteLoader.ts
"use client";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export function useRouteLoader(delay = 2000) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const previousPath = useRef(pathname);

  useEffect(() => {
    if (previousPath.current !== pathname) {
      setLoading(true);
      previousPath.current = pathname;

      const timeout = setTimeout(() => {
        setLoading(false);
      }, delay); // e.g. 500ms or customize

      return () => clearTimeout(timeout);
    }
  }, [pathname, delay]);

  return loading;
}
