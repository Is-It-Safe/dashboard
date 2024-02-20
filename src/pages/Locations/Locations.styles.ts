import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
`;
export const Content = styled.div`
  width: 100%;
  padding-left: 21px;
  /* padding-bottom: 38px; */
  padding-top: 39px;
  box-sizing: border-box;
  background-color: #faf9ff;
  display: grid;
  grid-template-rows: 1fr auto;
`;
export const HeaderContentContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  background-color: #faf9ff;
  overflow-y: scroll;
  position: relative;
`;
