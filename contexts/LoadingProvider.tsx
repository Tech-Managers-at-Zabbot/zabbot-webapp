// contexts/LoadingProvider.tsx
"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import Loader from "@/components/general/Loader";
import { usePathname, useSearchParams } from "next/navigation";

type LoadingContextType = {
  loading: boolean;
  setLoading: (loading: boolean) => void;
};

const LoadingContext = createContext<LoadingContextType>({
  loading: false,
  setLoading: () => {},
});

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentLocation = `${pathname}?${searchParams.toString()}`;
  const previousPath = useRef(currentLocation);

  useEffect(() => {
    if (previousPath.current !== currentLocation) {
      previousPath.current = currentLocation;
      setLoading(false);
    }
  }, [currentLocation]);

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [loading]);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {loading && <Loader />}
      {children}
    </LoadingContext.Provider>
  );
};
