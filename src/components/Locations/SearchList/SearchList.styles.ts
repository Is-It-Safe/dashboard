import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fdfcff;
  padding: 24px 16px;
  margin: 0 37px;
  height: 65px;
  border-bottom: 1px solid #efecfd;
`;

export const Content = styled.div`
  display: flex;
`;

export const SearchInputContainer = styled.div`
  position: relative;
`;

export const IconContainer = styled.div`
  position: absolute;
  top: 15%;
`;
export const Title = styled.h1`
  color: var(--primrias-900, #241b5e);

  font-family: Poppins;
  font-size: 22px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

export const SearchInput = styled.input`
  width: 408px;
  height: 34px;
  padding: 12.5px 28px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border: 1px solid var(--neutros-200, #efecfd);
`;

export const AddButton = styled.button`
  background-color: #5c45ed;
  color: white;
  border: none;
  border-radius: 4px;
  width: 119px;
  height: 34px;

  color: var(--neutros-100, #faf9ff);
  text-align: center;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

export const DropdownContainer = styled.div`
  position: relative;
  margin-left: 12px;
  margin-right: 12px;
`;
export const DropdownButton = styled.button`
  padding: 8px;
  background-color: #fff;
  color: #000;
  font-size: 12px;
  border: 1px solid #efecfd;

  border-radius: 4px;
  display: flex;
  line-height: 24px;
  display: flex;
  align-items: center;
  /* width: 140px; */
  height: 34px;

  &.open {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
`;
interface DowniconProps {
  isOpen: boolean;
}
export const DowniconsContainer = styled.svg<DowniconProps>`
  width: 24px;
  height: 24px;
  transition: transform 0.3s;

  transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

export const DropdownButtonTitle = styled.h1`
  color: var(--neutros-900, #190a33);
  font-family: Poppins;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  margin-right: 33px;
  margin-left: 4px;
`;
export const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: #fff;
  border: 1px solid #efecfd;

  border-top: none;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  overflow: hidden;
`;

export const DropdownButtonItem = styled.button`
  font-family: Poppins;
  font-size: 12px;
  border: 0;
  background: #fff;
  width: 100%;
  text-align: left;
  padding: 10px;

  &:hover {
    background-color: #efecfd;
  }
`;

export const CloseiconsContainer = styled.svg`
  width: 20px;
  height: 18px;
  color: var(--neutros-900, #190a33);
`;
