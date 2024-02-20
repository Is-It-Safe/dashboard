import styled, { css } from 'styled-components';

interface ButtonProps {
  selected: boolean;
}
export const Container = styled.div`
  background: var(--neutros-50);
  padding: 16px 24px;
  border-radius: 2px;
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 16px;
  margin-bottom: 16px;
  border-bottom: 0.7px solid #efecfd;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SubHeader = styled.div`
  display: flex;
`;
const buttonStyles = css<ButtonProps>`
  width: 60px;
  height: 24px;
  display: flex;
  padding: 0px 16px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex: 1 0 0;
  align-self: stretch;
  border-radius: 24px 0px 0px 24px;
  border: 0.7px solid var(--primrias-100, #9d8df4);
  color: var(--primrias-400);
  text-align: center;
  font-size: 10px;
  line-height: 16px;
  background: ${({ selected }) =>
    selected ? 'var(--primrias-100, #DCD6FC)' : '#fcfcff'};
  transition: background-color 0.3s;
  color: ${({ selected }) => (selected ? '#4937BE' : '#9d8df4')};
  font-weight: ${({ selected }) => (selected ? '600' : '400')};
`;

export const ButtonMonth = styled.button<ButtonProps>`
  ${buttonStyles}
  border-radius: 24px 0px 0px 24px;
  border-right-color: transparent;
`;

export const ButtonYear = styled.button<ButtonProps>`
  ${buttonStyles}
  border-radius: 0px 24px 24px 0px;
`;

export const ArrowButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--base-background);
  width: 24px;
  height: 24px;
  border: 1px solid var(--primarias-100);
  border-radius: 50%;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};

  &:hover {
    opacity: ${({ disabled }) => (disabled ? 1 : 0.8)};
  }
`;
export const YearButton = styled.h5<ButtonProps>`
  color: var(--neutros-900);
  font-size: 12px;
  font-weight: 600;
  padding: 0 9px;
`;

export const Legend = styled.div`
  display: flex;
  margin-top: 10px;
`;

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
`;

export const LegendColor = styled.div`
  width: 10px;
  height: 10px;
  background-color: ${({ color }) => color};
  margin-right: 5px;
`;

export const LegendLabel = styled.span`
  font-size: 12px;
`;
export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 12px;
`;
export const DropdownContainer = styled.div`
  position: relative;
  margin-left: 24px;
`;
export const DropdownButton = styled.button`
  background-color: #fff;
  color: #000;
  font-size: 12px;
  line-height: 32.7px;
  font-weight: normal;
  border: 1px solid #b9b3da;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 60px;
  padding: 8px 16px;
  line-height: 24px;

  &.open {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
`;
interface DowniconProps {
  isOpen: boolean;
}
export const DowniconsContainer = styled.svg<DowniconProps>`
  width: 16px;
  height: 16px;
  margin-left: 4px;
  transition: transform 0.3s;

  transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
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
  padding: 8px 16px;
  font-size: 14px;
  border: 0;
  background: #fff;
  width: 100%;
  text-align: left;

  &:hover {
    background-color: #efecfd;
  }
`;
