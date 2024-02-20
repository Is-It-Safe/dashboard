import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;

  gap: 2rem;
  width: 100%;
`;
export const Content = styled.div`
  width: 100%;
  padding: 16px 24px 16px 24px;
  display: flex;
  justify-content: space-between;
  background: #fdfcff;
`;
export const Col = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PercentageContainer = styled.div`
  display: flex;
  align-items: end;
  justify-content: center;
  gap: 2px;
`;

export const Percentage = styled.h1`
  display: flex;
  align-items: center;

  color: #241b5e;
  text-align: right;
  font-family: Poppins;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 12px;
`;
export const Title = styled.h1`
  color: #9d8df4;
  font-family: Poppins;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: 0.15px;
  padding-bottom: 5px;
`;
export const Total = styled.h1`
  color: #241b5e;
  font-family: Poppins;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%;
`;
