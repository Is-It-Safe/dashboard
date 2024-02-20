import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface Props {
  isSidebarExpanded: boolean;
  position: number;
}

export const SidebarContainer = styled.div<Pick<Props, 'isSidebarExpanded'>>`
  width: ${(props) => (props.isSidebarExpanded ? '20.6vw' : '5.3vw')};
  height: 100%;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
    linear-gradient(264.3deg, #381766 3.22%, #1f1045 43.38%, #494392 89.8%);
  margin-top: 0;
  margin-left: 0;
  padding: 0;
  box-sizing: border-box;

  button {
    margin-block: 16px;
    position: absolute;
    top: 0;
    left: ${(props) => (props.isSidebarExpanded ? '16vw' : '4vw')};
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 100;
    font-size: 20px;
    width: 36px;
    height: 36px;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
      linear-gradient(264.3deg, #381766 3.22%, #1f1045 43.38%, #494392 89.8%);
    box-shadow: -3px 4px 4px 0px rgba(0, 0, 0, 0.25);
    border-radius: 42px;
    transform: ${(props) =>
      props.isSidebarExpanded ? 'rotate(-180deg)' : 'rotate(0deg)'};
    z-index: 1;
  }
`;

export const Logo = styled.div<Pick<Props, 'isSidebarExpanded'>>`
  width: 100%;
  margin-top: 2vh;
  display: flex;
  height: ${(props) => (props.isSidebarExpanded ? '15vh' : '30vh')};
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    display: block;
    max-width: ${(props) => (props.isSidebarExpanded ? '207px' : '150px')};
    width: auto;
    height: auto;
    transform: ${(props) =>
      props.isSidebarExpanded ? 'rotate(0deg)' : 'rotate(270deg)'};
  }
`;

export const SidebarMenu = styled.div`
  width: 100%;
  position: relative;
`;

export const SidebarMenuItem = styled.div<Pick<Props, 'isSidebarExpanded'>>`
  width: 100%;
  height: ${(props) => (props.isSidebarExpanded ? '69px' : '50px')};
  display: flex;
  gap: 15px;
  padding-left: ${(props) => (props.isSidebarExpanded ? '2.5vw' : '2vw')};
  font-size: 18px;
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  align-items: center;
  color: #9d8df4;
  stroke-width: 0.5px;

  div {
    color: white;
    display: ${(props) => (props.isSidebarExpanded ? 'block' : 'none')};
  }
`;

export const SidebarMask = styled.div<Props>`
  width: 100%;
  height: ${(props) => (props.isSidebarExpanded ? '69px' : '50px')};
  background-color: rgba(253, 252, 255, 0.2);
  position: absolute;
  z-index: 1;
  left: 0;
  top: ${(props) => `${props.position}px`};
  background-blend-mode: overlay;
  border-right: 4px solid #9d8df4;
  box-sizing: border-box;
`;

export const Links = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
  color: var(--primarias-100);
  gap: 19px;
`;
