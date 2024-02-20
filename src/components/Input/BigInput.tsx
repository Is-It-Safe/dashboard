import { ReactNode, forwardRef } from 'react';
import { BasicInput, ErrorMessage, LabelInput } from './Input.style';
import { FieldError } from 'react-hook-form';

type IBigInput = React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
> & {
  label?: ReactNode;
  error?: FieldError | undefined;
};

type Ref = React.LegacyRef<HTMLTextAreaElement> | undefined;

const BaseInput = ({ label, error, ...props }: IBigInput, ref: Ref) => {
  const hasError = !!error;
  const errorMessage = error?.message;

  return (
    <BasicInput>
      <LabelInput hasError={hasError}>{label}</LabelInput>
      <textarea
        className={`form-textarea ${hasError ? 'input-error' : ''}`}
        rows={4}
        wrap="soft"
        ref={ref}
        {...props}
      />
      {hasError && (
        <ErrorMessage data-testid="input-error">{errorMessage}</ErrorMessage>
      )}
    </BasicInput>
  );
};

const BigInput = forwardRef(BaseInput);

export { BigInput };
