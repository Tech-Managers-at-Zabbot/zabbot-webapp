"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AlertProvider } from "next-alert";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { LoadingProvider } from "@/contexts/LoadingProvider";
import { ThemeProvider } from "@/contexts/ThemeProvider";
import { UserProvider } from "@/contexts/UserContext";
// import { LessonProvider } from "@/contexts/LessonContext";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AlertProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <UserProvider>
            <LanguageProvider>
              <LoadingProvider>{children}</LoadingProvider>
            </LanguageProvider>
          </UserProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </AlertProvider>
  );
}
