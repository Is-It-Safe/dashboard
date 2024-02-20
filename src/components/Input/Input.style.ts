import styled from 'styled-components';

type IInput = { hasError?: boolean };

export const BasicInput = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  font-weight: 600;
  font-size: 14px;
  line-height: 21px;
  gap: 4px;

  .form-input {
    border-width: 1px;
    border-style: solid;
    height: 37px;
    max-width: 100%;
    border-radius: 6px;
    border-color: #9d8df4;
    padding-left: 8px;
    padding-right: 8px;
  }

  .form-input:focus,
  .form-input:focus-visible {
    border-color: #6200ee;
    outline: #6898c9; /* Avoid firefox and safari auto style for outline*/
    font-weight: 700;
  }

  .input-error,
  .input-error:focus,
  .input-error:focus-visible {
    border-color: #eb3d3d !important;
  }

  .form-textarea {
    border-color: #ced4da;
    border-width: 2px;
    border-style: solid;
    width: 100%;
    border-radius: 6px;
    padding: 8px;
    resize: none;
  }

  .form-textarea:focus,
  .form-textarea:focus-visible {
    border-color: #9d8df4;
    outline: #6898c9; /* Avoid firefox and safari auto style for outline*/
  }
`;

export const LabelInput = styled.label<IInput>`
  color: ${(props) => (props.hasError ? '#EB3D3D' : '#5b3cf1')};
  position: absolute;
  top: -12px;
  left: 8px;
  background-color: white;
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 24px;
`;

export const ErrorMessage = styled.span`
  color: #eb3d3d;
  font-size: 12;
  font-weight: '400';
  max-width: 100%;
`;
