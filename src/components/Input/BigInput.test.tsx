import { render, fireEvent } from '@testing-library/react';
import { BigInput } from './BigInput';
import { FieldError } from 'react-hook-form';

describe('Input component', () => {
  it('renders the input label correctly', () => {
    const labelText = 'Name';
    const { getByText } = render(<BigInput label={labelText} name="name" />);

    expect(getByText(labelText)).toBeInTheDocument();
  });

  it('renders the input error message correctly', () => {
    const errorMessage = 'Required field';
    const error: FieldError = {
      type: 'required',
      message: errorMessage,
    };
    const { getByText } = render(
      <BigInput label="Email" name="email" error={error} />
    );

    expect(getByText(errorMessage)).toBeInTheDocument();
  });

  it('calls the provided ref when input is focused', async () => {
    const refMock = jest.fn();
    const { findByTestId } = render(
      <BigInput
        data-testid="input"
        label="Password"
        name="password"
        ref={refMock}
      />
    );

    const inputElement = await findByTestId('input');
    fireEvent.focus(inputElement);

    expect(refMock).toHaveBeenCalled();
  });
});
