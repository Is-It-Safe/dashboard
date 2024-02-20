import { render } from '@testing-library/react';
import { SelectComponent, Option } from './Select';

describe('SelectComponent', () => {
  const options: Option[] = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ];

  it('renders the select label correctly', () => {
    const labelText = 'Select an option';
    const { getByText } = render(
      <SelectComponent
        label={labelText}
        options={options}
        onChange={jest.fn()}
      />
    );

    expect(getByText(labelText)).toBeInTheDocument();
  });

  it('renders the select error message correctly', () => {
    const errorMessage = 'Selecione um valor';
    const error = { type: 'required', message: errorMessage };
    const { getByText } = render(
      <SelectComponent
        label="Select an option"
        options={options}
        onChange={jest.fn()}
        error={error}
      />
    );

    expect(getByText(errorMessage)).toBeInTheDocument();
  });
});
