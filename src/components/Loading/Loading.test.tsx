import { render } from '@testing-library/react';
import Loading from './Loading';
import '@testing-library/jest-dom/extend-expect';

test('renders the Loading component', () => {
  const { getByTestId } = render(<Loading />);
  const spinnerContainer = getByTestId('spinner-container');
  const spinner = getByTestId('spinner');

  expect(spinnerContainer).toBeInTheDocument();
  expect(spinner).toBeInTheDocument();
});
