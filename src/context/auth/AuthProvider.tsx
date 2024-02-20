/* eslint-disable @typescript-eslint/no-empty-function */
import React, {
  createContext,
  useState,
  ReactNode,
  useMemo,
  useContext,
} from 'react';

export interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  persist: boolean;
  setAccessToken: (token: string | null) => void;
  setRefreshToken: (token: string | null) => void;
  setPersist: (persist: boolean) => void;
  handleLogout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  accessToken: '',
  refreshToken: '',
  persist: false,
  setAccessToken: () => {},
  setRefreshToken: () => {},
  handleLogout: () => {},
  setPersist: () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  const [persist, setPersist] = useState<boolean>(
    localStorage.getItem('persist') === 'true' ? true : false
  );

  const handleSetAccessToken = (token: string | null) => {
    if (token) {
      setAccessToken(token);
      localStorage.setItem('access_token', token);
    } else {
      localStorage.removeItem('access_token');
    }
  };

  const handleSetRefreshToken = (token: string | null) => {
    if (token) {
      setRefreshToken(token);
      localStorage.setItem('refresh_token', token);
    } else {
      localStorage.removeItem('refresh_token');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setAccessToken(null);
    setRefreshToken(null);
    setPersist(false);
  };

  const contextValues = useMemo(
    () => ({
      accessToken,
      refreshToken,
      persist,
      setPersist,
      handleLogout,
      setAccessToken: handleSetAccessToken,
      setRefreshToken: handleSetRefreshToken,
    }),
    [
      accessToken,
      refreshToken,
      persist,
      setPersist,
      handleLogout,
      handleSetAccessToken,
      handleSetRefreshToken,
    ]
  );

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
