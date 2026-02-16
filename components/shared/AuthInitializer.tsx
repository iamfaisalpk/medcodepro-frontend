'use client';

import { useEffect, useState } from 'react';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { setCredentials, setLoading } from '@/store/authSlice';
import api, { setAccessToken, getAccessToken } from '@/lib/axios';

export function AuthInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const [init, setInit] = useState(false);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedToken = getAccessToken();
        
        if (storedToken) {
          // If we have a token, try to get user data to verify it
          try {
            const response = await api.get('/auth/me');
            const user = response.data.user;
            dispatch(setCredentials({ user, isAuthenticated: true }));
          } catch (meError) {
            // Token might be expired, try refreshing
            const refreshResponse = await api.get('/auth/refresh');
            const { token, user } = refreshResponse.data;
            setAccessToken(token);
            dispatch(setCredentials({ user, isAuthenticated: true }));
          }
        } else {
          // No token in localStorage, try refreshing from cookie
          const response = await api.get('/auth/refresh');
          const { token, user } = response.data;
          setAccessToken(token);
          dispatch(setCredentials({ user, isAuthenticated: true }));
        }
      } catch (error) {
        // Everything failed, clear state
        dispatch(setCredentials({ user: null, isAuthenticated: false }));
      } finally {
        dispatch(setLoading(false));
        setInit(true);
      }
    };

    initializeAuth();
  }, [dispatch]);

  if (!init) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#f8fafc]">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#6A89A7] border-t-transparent shadow-xl"></div>
      </div>
    );
  }

  return <>{children}</>;
}
