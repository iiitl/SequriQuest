import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: { teamName: string } | null;
}

export function useAuth(redirectTo?: string) {
  const [auth, setAuth] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
    user: null
  });
  const router = useRouter();

  useEffect(() => {
    async function checkAuthStatus() {
      try {
        const res = await fetch('/api/auth/verify', {
          credentials: 'include'
        });
        
        const data = await res.json();
        
        if (data.isAuthenticated) {
          setAuth({
            isAuthenticated: true,
            isLoading: false,
            user: { teamName: data.teamName }
          });
        } else {
          setAuth({
            isAuthenticated: false,
            isLoading: false,
            user: null
          });
          
          if (redirectTo) {
            router.push(redirectTo);
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setAuth({
          isAuthenticated: false,
          isLoading: false,
          user: null
        });
        
        if (redirectTo) {
          router.push(redirectTo);
        }
      }
    }
    
    checkAuthStatus();
  }, [router, redirectTo]);
  
  return auth;
}