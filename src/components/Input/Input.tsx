import { ReactNode, forwardRef } from 'react';
import { BasicInput, ErrorMessage, LabelInput } from './Input.style';
import { FieldError } from 'react-hook-form';

type IInput = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label?: ReactNode;
  error?: FieldError | undefined;
};

type Ref = React.LegacyRef<HTMLInputElement>;

const BaseInput = ({ label, error, ...props }: IInput, ref: Ref) => {
  const hasError = !!error;
  const errorMessage = error?.message;

  return (
    <BasicInput>
      <LabelInput hasError={hasError}>{label}</LabelInput>
      <input
        className={`form-input ${hasError ? 'input-error' : ''}`}
        ref={ref}
        {...props}
      />
      {hasError && (
        <ErrorMessage data-testid="input-error">{errorMessage}</ErrorMessage>
      )}
    </BasicInput>
  );
};

const Input = forwardRef(BaseInput);

export { Input };
