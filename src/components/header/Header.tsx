import { useQuery } from 'react-query';
import { useAuth } from '../../context/auth/AuthProvider';
import { useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { getLoggedUser } from '../../services/get-logged-user/get-logged-user-service';
import { ReactComponent as Downicons } from '../../assets/Icons/Downicons.svg';
import { ReactComponent as Upicons } from '../../assets/Icons/Upicons.svg';
import profile from '../../assets/profile.png';
import * as Styled from './Header.styles';

const Header = () => {
  const { accessToken, setAccessToken } = useAuth();
  const [username, setUsernmae] = useState<string>('user');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isUpIconVisible, setIsUpIconVisible] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState<string>(profile);
  const { data: user } = useQuery('user', () => getLoggedUser(accessToken), {
    refetchInterval: 50000,
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
    <Styled.HeaderContainer>
      <Styled.Container>
        <Styled.Title>Dashboard</Styled.Title>
        <Styled.UserContainer>
          <Styled.TitleUser>Olá {username}</Styled.TitleUser>
          <Styled.DropdownContainer>
            <Styled.DropdownButton
              onClick={() => {
                setIsDropdownVisible(!isDropdownVisible);
                setIsUpIconVisible(!isDropdownVisible);
              }}
            >
              <Styled.DowniconsContainer isOpen={isUpIconVisible}>
                {isUpIconVisible ? (
                  <Upicons width={24} height={24} />
                ) : (
                  <Downicons width={24} height={24} />
                )}
              </Styled.DowniconsContainer>
            </Styled.DropdownButton>
            {isDropdownVisible && (
              <Styled.DropdownMenu>
                <Styled.DropdownButtonItem onClick={handleLogout}>
                  Sair
                </Styled.DropdownButtonItem>
              </Styled.DropdownMenu>
            )}
          </Styled.DropdownContainer>

          <Styled.UserPhoto data-testid="user-profile-pic" src={profilePhoto} />
        </Styled.UserContainer>
      </Styled.Container>
    </Styled.HeaderContainer>
  );
};

export default Header;
