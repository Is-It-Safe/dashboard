import styled from 'styled-components';

type InputProps = {
  hasError?: boolean;
};
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-family: Arial, sans-serif;
`;

export const Content = styled.div`
  display: flex;
  width: 466px;
  padding: 48px 24px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  background: #fcfcff;
  box-shadow: 5px 5px 40px -29px rgba(38, 17, 73, 0.1);
`;

export const Form = styled.form`
  width: 347px;
`;

export const Title = styled.h1`
  color: var(--primrias-900);
  font-family: Poppins;
  font-size: 28px;
  font-weight: 700;
  padding-bottom: 4px;
  padding-left: 16px;
`;

export const ErrorMsg = styled.div`
  color: #eb3d3d;
  font-size: 14px;
  margin-top: 4px;
`;

export const InputContainer = styled.div`
  position: relative;
`;

export const Input = styled.input<InputProps>`
  padding: 16px;
  border: 1px solid #190a33;
  border-radius: 6px;
  width: 100%;
  box-sizing: border-box;
  font-size: 18px;
  font-family: Poppins;
  margin-top: 20px;

  &::placeholder {
    color: #190a33;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
  }
`;
export const TogglePasswordIcon = styled.div`
  position: absolute;
  top: 50%;
  right: 10px;
  cursor: pointer;
`;

export const VisibilityIcon = styled.span`
  position: absolute;
  top: 50%;
  right: 10px;
  cursor: pointer;
  transform: translateY(-50%);
`;
export const Blindicons = styled.span`
  position: absolute;
  top: 50%;
  right: 10px;
  cursor: pointer;
  transform: translateY(-50%);
`;

export const Label = styled.label`
  color: #190a33;
  display: flex;
  justify-content: flex-end;
  font-family: Poppins;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: 0.15px;
  text-decoration-line: underline;
  margin-top: 4px;
`;

export const Button = styled.button`
  width: 347px;
  padding: 16px;
  margin-top: 24px;
  background-color: #5c45ed;
  color: #fcfcff;
  text-transform: uppercase;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-family: Poppins;
  font-weight: 600;

  &:hover {
    background-color: #460a82;
  }
`;
