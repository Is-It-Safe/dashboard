import { useQuery } from 'react-query';
import { useAuth } from '../../context/auth/AuthProvider';
import { useEffect, useState } from 'react'; // Importe apenas o useEffect e useState do 'react'.
import { useNavigate } from 'react-router-dom';
import { getLoggedUser } from '../../services/get-logged-user/get-logged-user-service';
import { ReactComponent as Down } from '../../assets/Icons/Downicons.svg';
import * as Style from './Header.styles';

const Header = () => {
  const { accessToken, setAccessToken } = useAuth();
  const [username, setUsernmae] = useState<string>('user');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState<string>(
    'src/assets/profile.png'
  );
  const { data: user } = useQuery('user', () => getLoggedUser(accessToken), {
    refetchInterval: 5000,
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setUsernmae(user.nickname);
      setProfilePhoto(user.profilePhoto);
    }
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem('refresh_token');
    setAccessToken('');
    setIsDropdownVisible(false);
    navigate('/login');
  };

  return (
    <Style.HeaderContainer>
      <h1>Dashboard</h1>
      <Style.UserContainer>
        <p>olá {username}</p>
        <Style.ButtonContainer>
          <Down
            color={'#241B5E'}
            onClick={() => setIsDropdownVisible(!isDropdownVisible)}
          />
          {isDropdownVisible && (
            <Style.DropdownContent>
              <Style.LogoutButton onClick={handleLogout}>
                Sair
              </Style.LogoutButton>
            </Style.DropdownContent>
          )}
        </Style.ButtonContainer>
        <Style.UserPhoto src={profilePhoto} alt="user" />
      </Style.UserContainer>
    </Style.HeaderContainer>
  );
};

export default Header;