import device from "../constants/breakpoints";
import { useState, useEffect } from "react";

export const useMatchMediaQuery = (mediaQuery = device.tablet) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    setMatches(window.matchMedia(mediaQuery).matches);
  }, []);
  useEffect(() => {
    function handleResize() {
      setMatches(window.matchMedia(mediaQuery).matches);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return matches;
};

function getWindowDimensions() {
  if (typeof window === "undefined") {
    return {
      height: undefined,
      width: undefined,
      ComplexScreenWarning: null,
    };
  }
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}
