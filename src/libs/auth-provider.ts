import jwtDecode, { JwtPayload } from 'jwt-decode';
import { createContext, useContext, useMemo } from 'react';

type ContextType = {
  token?: string;
  setAuthToken: (token?: string) => void;
};
const context = createContext<ContextType>(undefined as never);

/**
 * 認証トークンの設定
 */
export const useAuthToken = () => {
  const { setAuthToken } = useContext(context);
  return setAuthToken;
};
/**
 * 認証情報の取得
 */
export const useAuthInfo = () => {
  const { token } = useContext(context);
  const info = useMemo(() => {
    try {
      if (token) {
        return jwtDecode(token) as JwtPayload & { name: string };
      }
    } catch (_) {}
    return undefined;
  }, [token]);
  return info;
};

export const AuthProvider = context.Provider;
