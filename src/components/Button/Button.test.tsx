import { render, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button component', () => {
  it('renders the button text correctly', () => {
    const buttonText = 'Click me';
    const { getByText } = render(<Button>{buttonText}</Button>);
    expect(getByText(buttonText)).toBeInTheDocument();
  });

  it('calls the onClick handler when clicked', () => {
    const onClickMock = jest.fn();
    const { getByText } = render(
      <Button onClick={onClickMock}>Click me</Button>
    );
    fireEvent.click(getByText('Click me'));
    expect(onClickMock).toHaveBeenCalled();
  });

  it('passes the correct props to the button element', () => {
    const { container } = render(
      <Button primary grow type="submit">
        Button
      </Button>
    );
    const buttonElement = container.querySelector('button');
    expect(buttonElement).toHaveAttribute('type', 'submit');
  });
});
