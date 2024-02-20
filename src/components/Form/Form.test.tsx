import { render, fireEvent } from '@testing-library/react';
import { Form } from './Form';

describe('Form component', () => {
  it('renders the form children correctly', () => {
    const { getByText } = render(
      <Form handleSubmit={jest.fn()} onSubmit={jest.fn()}>
        <input type="text" name="name" />
        <button type="submit">Submit</button>
      </Form>
    );

    expect(getByText('Submit')).toBeInTheDocument();
    expect(getByText('Submit')).toHaveAttribute('type', 'submit');
    expect(getByText('Submit')).toBeInstanceOf(HTMLButtonElement);

    expect(getByText('Submit')).toBeInTheDocument();
    expect(getByText('Submit')).toHaveAttribute('type', 'submit');
    expect(getByText('Submit')).toBeInstanceOf(HTMLButtonElement);
  });

  it('calls the onSubmit handler when the form is submitted', async () => {
    const handlesubmitMock = jest.fn();
    const { findByTestId } = render(
      <Form
        data-testid="form"
        handleSubmit={handlesubmitMock}
        onSubmit={jest.fn()}
      >
        <input type="text" name="name" />
        <button type="submit">Submit</button>
      </Form>
    );

    const formElement = await findByTestId('form');
    fireEvent.submit(formElement);

    expect(handlesubmitMock).toHaveBeenCalled();
  });
});
