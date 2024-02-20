import styled from 'styled-components';

export const HeaderContainer = styled.header`
  display: flex;
  width: calc(100% - 13px);
  padding: 24px 48px;
  justify-content: space-between;
  align-items: center;
  background: var(--neutros-50);
  font-family: 'Poppins', sans-serif;
  color: #9d8df4;
  margin-left: 13px;
`;

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 68px;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.h1`
  font-family: Poppins;
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  color: var(--primrias-100, #9d8df4);
`;

export const TitleUser = styled.p`
  color: var(--primrias-900, #241b5e);
  font-family: Poppins;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 22px;
  padding-right: 16px;
`;
export const UserContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const UserPhoto = styled.img`
  width: 48px;
  height: 48px;
`;
export const DropdownContainer = styled.div`
  position: relative;
`;

export const DropdownButton = styled.button`
  display: flex;
  border: none;
  background: rgba(253, 252, 255, 0.5);
  margin-right: 10px;

  &.open {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;

    svg {
      transform: rotate(180deg);
    }
  }
`;

interface DowniconProps {
  isOpen: boolean;
}
export const DowniconsContainer = styled.svg<DowniconProps>`
  width: 24px;
  height: 24px;
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: #fff;
  border: 1px solid #ccc;
  border-top: none;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  overflow: hidden;
`;

export const DropdownButtonItem = styled.button`
  font-size: 14px;
  border: 0;
  background: #fff;
  width: 100%;

  &:hover {
    background-color: #efecfd;
  }
`;
