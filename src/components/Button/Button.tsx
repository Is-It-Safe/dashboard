import { ReactNode } from 'react';
import { BasicButton, TextButton } from './Button.styles';

export type ButtonProps = {
  primary?: boolean;
  grow?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset' | undefined;
  style?: React.CSSProperties;
};
type IButton = { children: ReactNode; onClick?: () => void } & ButtonProps;

const Button = ({ children, ...props }: IButton) => {
  return (
    <BasicButton disabled={props.disabled} {...props}>
      <TextButton>{children}</TextButton>
    </BasicButton>
  );
};

export { Button };
