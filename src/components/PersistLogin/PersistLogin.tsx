import { Outlet, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useRefreshToken from '../../hooks/useRefreshToken';
import { useAuth } from '../../context/auth/AuthProvider';

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { setRefreshToken, setAccessToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        navigate('/login');
      } finally {
        setIsLoading(false);
      }
    };

    verifyRefreshToken();
  }, [setRefreshToken, setAccessToken, navigate, refresh]);

  return <>{isLoading ? <p>Loading...</p> : <Outlet />}</>;
};

export default PersistLogin;
