import { useAuthStore } from "../store/auth-store";
import { parseJwt } from "../utils/parseJwt";

export const useAuth = () => {
  const token = useAuthStore((state) => state.token);
  const tokenInfo = parseJwt(token)

  return {
    isAuth: !!token,
    token,
    infoFromToken: tokenInfo
  };
};
