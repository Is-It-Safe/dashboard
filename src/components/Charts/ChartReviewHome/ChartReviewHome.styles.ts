import styled, { css } from 'styled-components';

interface ButtonProps {
  selected: boolean;
}

export const Container = styled.div`
  width: 730px;
  background: var(--neutros-50);
  padding: 16px;
  border-radius: 2px;
`;
export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-inline: 24px;
  padding-bottom: 16px;
  border-bottom: 0.7px solid #efecfd;
`;

export const Title = styled.h2`
  font-weight: 700;
  font-size: 22px;
  line-height: 33px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SubHeader = styled.div`
  display: flex;
  align-items: center;
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
`;

export const YearButton = styled.h5<ButtonProps>`
  color: var(--neutros-900);
  font-size: 12px;
  font-weight: 600;
  padding: 0 9px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 12px;
`;
