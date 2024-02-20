import { render, fireEvent } from '@testing-library/react';
import { SearchList } from './SearchList';

jest.mock('../../../../assets/Icons/Filtericons.svg', () => ({
  ReactComponent: 'FilterIcon',
}));
jest.mock('../../../../assets/Icons/Downicons.svg', () => ({
  ReactComponent: 'DownIcon',
}));
jest.mock('../../../../assets/Icons/SearchIcon.svg', () => ({
  ReactComponent: 'SearchIcon',
}));

const mockSetSearchTerm = jest.fn();
const mockSetShowAddModal = jest.fn();
const mockSetSelectedRatings = jest.fn();

test('renders SearchList component correctly', () => {
  const { getByText, getByPlaceholderText } = render(
    <SearchList
      setSearchTerm={mockSetSearchTerm}
      setSelectedRatings={mockSetSelectedRatings}
      selectedRatings={[1, 2, 3, 4, 5]}
    />
  );

  const titleElement = getByText('Locais');
  expect(titleElement).toBeInTheDocument();

  const searchInput = getByPlaceholderText('Buscar');
  expect(searchInput).toBeInTheDocument();
});

test('calls setSearchTerm when search input changes', () => {
  const { getByPlaceholderText } = render(
    <SearchList
      setSearchTerm={mockSetSearchTerm}
      setSelectedRatings={mockSetSelectedRatings}
      selectedRatings={[1, 2, 3, 4, 5]}
    />
  );

  const searchInput = getByPlaceholderText('Buscar');

  fireEvent.change(searchInput, { target: { value: 'test' } });

  expect(mockSetSearchTerm).toHaveBeenCalledWith('test');
});

test('calls setShowAddModal when Add button is clicked', () => {
  const { getByText } = render(
    <SearchList
      setSearchTerm={mockSetSearchTerm}
      setSelectedRatings={mockSetSelectedRatings}
      selectedRatings={[1, 2, 3, 4, 5]}
    />
  );

  const addButton = getByText('+ADD');
  fireEvent.click(addButton);

  expect(mockSetShowAddModal).toHaveBeenCalled();
});
