"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AlertProvider } from "next-alert";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { LoadingProvider } from "@/contexts/LoadingProvider";
import { ThemeProvider } from "@/contexts/ThemeProvider";
import { UserProvider } from "@/contexts/UserContext";
// import { PayPalScriptProvider } from "@paypal/react-paypal-js"
import { LessonProvider } from "@/contexts/LessonContext";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  // const payPalOptions = {
  //   "clientId": "",
  //   vault: "true",
  //   intent: "capture"
  // }
  return (
    <AlertProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          {/* <PayPalScriptProvider
          options={payPalOptions}
          > */}
          <UserProvider>
          <LessonProvider>
            <LanguageProvider>
              <LoadingProvider>{children}</LoadingProvider>
            </LanguageProvider>
          </LessonProvider>
          </UserProvider>
          {/* </PayPalScriptProvider> */}
        </ThemeProvider>
      </QueryClientProvider>
    </AlertProvider>
  );
}
