import { useAuthStore } from "../store/auth-store";

export const useAuth = () => {
  const token = useAuthStore((state) => state.token);
  
  return {
    isAuth: !!token,
    token,
  };
};
