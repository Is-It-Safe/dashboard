import { useAuth } from '../context/auth/AuthProvider';
import { getRefreshToken } from '../services/refresh-token/refresh-token-service';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

interface JwtPayload {
  sub: string;
  roles: string;
  iat: number;
  exp: number;
}

const useRefreshToken = () => {
  const {
    persist,
    refreshToken,
    accessToken,
    setRefreshToken,
    setAccessToken,
    handleLogout,
  } = useAuth();
  const navigate = useNavigate();

  const handleTokenRefresh = async () => {
    if (
      !refreshToken &&
      !accessToken &&
      !localStorage.getItem('access_token') &&
      !localStorage.getItem('refresh_token')
    ) {
      handleLogout();
      navigate('/login');
      return;
    } else if (!refreshToken && !accessToken) {
      setAccessToken(localStorage.getItem('access_token'));
      setRefreshToken(localStorage.getItem('refresh_token'));
    } else if (!!refreshToken && accessToken !== refreshToken) {
      setAccessToken(refreshToken);
    }
    const now = Date.now() / 1000;
    if (refreshToken && persist) {
      const decodedRefreshToken: JwtPayload = jwtDecode(refreshToken);
      if (decodedRefreshToken.exp < now || !decodedRefreshToken.exp) {
        handleLogout();
        navigate('/login');
      } else if (decodedRefreshToken.exp - now < 30 * 60) {
        await getRefreshToken(refreshToken)
          .then((res) => {
            if (res.refresh_token) {
              setRefreshToken(res.refresh_token);
              setAccessToken(res.refresh_token);
            }
          })
          .catch((err) => {
            throw new Error(err);
          });
      }

      return refreshToken;
    }
  };

  return handleTokenRefresh;
};

export default useRefreshToken;
