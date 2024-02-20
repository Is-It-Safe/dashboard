import styled from 'styled-components';

export const SpinnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.3);
  border-top: 4px solid #b91c1c;
  border-right: 4px solid #ff8c00;
  border-bottom: 4px solid #ffed00;
  border-left: 4px solid #008026;
  border-left: 4px solid #0160c6;
  border-left: 4px solid #9d20bc;

  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
