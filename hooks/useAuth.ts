import { useAppSelector } from './useAppDispatch';

export const useAuth = () => {
  const { user, isAuthenticated, isLoading } = useAppSelector((state) => state.auth);

  return {
    user,
    isAuthenticated,
    isLoading,
    isAdmin: user?.role === 'admin' || user?.role === 'ADMIN',
  };
};
