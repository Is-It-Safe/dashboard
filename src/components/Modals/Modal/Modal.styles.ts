import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(24, 29, 32, 0.1);
  backdrop-filter: blur(8px);
  padding: 32px 32px 32px 32px;
  z-index: 99;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  width: 100%;
  max-width: 437px;
  background-color: #ffffff;
  padding: 20px 32px 32px 32px;
`;

export const Header = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
`;
