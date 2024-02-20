import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import * as Styled from './Sidebar.styles';
import { ReactComponent as DoubleArrow } from '../../assets/Icons/icon-dublearrow-lefticons.svg';
import { ReactComponent as Home } from '../../assets/Icons/Home.svg';
import { ReactComponent as Places } from '../../assets/Icons/Places.svg';
import { ReactComponent as Reviews } from '../../assets/Icons/Reviews.svg';
import { ReactComponent as Users } from '../../assets/Icons/Users.svg';
import { ReactComponent as Project } from '../../assets/Icons/Project.svg';
import { ReactComponent as Volunteers } from '../../assets/Icons/Volunteers.svg';
import logo from '../../assets/logo.png';

const Sidebar = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(() =>
    Boolean(localStorage.getItem('isSidebarExpanded'))
  );
  const [maskPosition, setMaskPosition] = useState(
    () => Number(localStorage.getItem('setMaskPosition')) || 0
  );
  const location = useLocation();

  useEffect(() => {
    const pagePositions: { [key: string]: number } = {
      '': 0,
      lugares: isSidebarExpanded ? 69 : 50,
      reviews: isSidebarExpanded ? 138 : 100,
      usuarios: isSidebarExpanded ? 207 : 150,
      projeto: isSidebarExpanded ? 276 : 200,
      voluntarios: isSidebarExpanded ? 345 : 250,
    };
    const currentPage = location.pathname.substring(1);
    const newPosition = pagePositions[currentPage] || 0;

    localStorage.setItem('setMaskPosition', String(newPosition));
    setMaskPosition(newPosition);
  }, [location.pathname, isSidebarExpanded]);

  const toggleSidebar = () => {
    const newValue = !isSidebarExpanded;
    localStorage.setItem('isSidebarExpanded', String(newValue));
    setIsSidebarExpanded(newValue);
  };

  return (
    <Styled.SidebarContainer isSidebarExpanded={isSidebarExpanded}>
      <button id="toggle" onClick={toggleSidebar}>
        <DoubleArrow />
      </button>
      <Styled.Logo isSidebarExpanded={isSidebarExpanded}>
        <img src={logo} alt="logo" />
      </Styled.Logo>
      <Styled.SidebarMenu>
        <Styled.SidebarMask
          position={maskPosition}
          isSidebarExpanded={isSidebarExpanded}
        />
        <Styled.SidebarMenuItem isSidebarExpanded={isSidebarExpanded}>
          <Styled.Links to="/">
            <Home />
            <div>Home</div>
          </Styled.Links>
        </Styled.SidebarMenuItem>
        <Styled.SidebarMenuItem isSidebarExpanded={isSidebarExpanded}>
          <Styled.Links to="/lugares">
            <Places />
            <div>Lugares</div>
          </Styled.Links>
        </Styled.SidebarMenuItem>
        <Styled.SidebarMenuItem isSidebarExpanded={isSidebarExpanded}>
          <Styled.Links to="/reviews">
            <Reviews />
            <div>Reviews</div>
          </Styled.Links>
        </Styled.SidebarMenuItem>
        <Styled.SidebarMenuItem isSidebarExpanded={isSidebarExpanded}>
          <Styled.Links to="/usuarios">
            <Users />
            <div>Usuarios</div>
          </Styled.Links>
        </Styled.SidebarMenuItem>
        <Styled.SidebarMenuItem isSidebarExpanded={isSidebarExpanded}>
          <Styled.Links to="/projeto">
            <Project />
            <div>Projeto</div>
          </Styled.Links>
        </Styled.SidebarMenuItem>
        <Styled.SidebarMenuItem isSidebarExpanded={isSidebarExpanded}>
          <Styled.Links to="/voluntarios">
            <Volunteers />
            <div>Voluntários</div>
          </Styled.Links>
        </Styled.SidebarMenuItem>
      </Styled.SidebarMenu>
    </Styled.SidebarContainer>
  );
};

export default Sidebar;
