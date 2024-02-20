import styled from 'styled-components';

export const PaginationContainer = styled.div`
  display: flex;
  height: 44px;
  justify-content: flex-end;
  padding-bottom: 46px;
  background-color: #fdfcff;
  border-top: 0.7px solid var(--neutros-200, #efecfd);
  /* margin: 0 48px; */
  padding-top: 14px;
  padding-bottom: 8px;
  align-items: center;
`;
export const Content = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
export const NumberContainer = styled.div`
  border-radius: 41px;
  border: 1px solid var(--primrias-100, #9d8df4);
  background: var(--neutros-050, #fdfcff);
  display: flex;
  padding: 4px;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;

export const PageButton = styled.button`
  margin: 0 5px;
  padding: 4px 6px;
  color: #9d8df4;
  border: none;
  cursor: pointer;
  border-radius: 50%;
  background: var(--neutros-100, #faf9ff);

  &.active {
    background-color: #7b61ff;
    color: #fdfcff;
    border-radius: 50%;
  }
`;

export const ButtonIcon = styled.button`
  border-radius: 50%;
  border-color: #9d8df4;
  border: none;
  background: #fdfcff;
`;
