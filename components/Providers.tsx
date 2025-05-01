'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AlertProvider } from 'next-alert';

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AlertProvider>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </AlertProvider>
  );
}