// components/AuthGuard.tsx
"use client";
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

function parseJwt(token: string) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    console.log(e)
    return null;
  }
}

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('access_token');

    if (!token) {
      router.replace('/login');
      return;
    }

    const decoded = parseJwt(token);
    const expired = !decoded?.exp || decoded.exp * 1000 < Date.now();

    if (expired) {
      Cookies.remove('access_token');
      router.replace('/login');
    }
  }, [router]);

  return <>{children}</>;
}
