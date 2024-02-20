import styled from 'styled-components';

export const PageContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
`;

export const Content = styled.div`
  width: 100%;
  padding-left: 42px;
  padding-right: 52px;
  padding-bottom: 46px;
  padding-top: 36px;
  box-sizing: border-box;
  background-color: #faf9ff;
  display: grid;
  grid-template-rows: 1fr auto;
  grid-gap: 23px;
`;

export const Whapper = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
`;
export const HeaderContentContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  background-color: #faf9ff;
  overflow-y: scroll;
  position: relative;
`;
