import { render, fireEvent } from '@testing-library/react';
import { SearchList } from './SearchList';
import { DowniconsContainer } from './SearchList.styles';

jest.mock('../../../assets/Icons/Closeicons.svg', () => ({
  ReactComponent: () => <div data-testid="close-icon" />,
}));
jest.mock('../../../assets/Icons/Filtericons.svg', () => ({
  ReactComponent: () => <div data-testid="filter-icon" />,
}));
jest.mock('../../../assets/Icons/Downicons.svg', () => ({
  ReactComponent: () => <div data-testid="down-icon" />,
}));
jest.mock('../../../assets/Icons/SearchIcon.svg', () => ({
  ReactComponent: () => <div data-testid="search-icon" />,
}));

const mockSetSearchTerm = jest.fn();
const mockSetShowAddModal = jest.fn();
const mockSetPendingValidationFilter = jest.fn();
const mockSetIsFilteringByPendingValidation = jest.fn();

afterEach(() => {
  jest.resetAllMocks();
});

test('renders SearchList component correctly', () => {
  const { getByText, getByPlaceholderText } = render(
    <SearchList
      setShowAddModal={mockSetShowAddModal}
      setSearchTerm={mockSetSearchTerm}
      pendingValidationFilter={false}
      setPendingValidationFilter={mockSetPendingValidationFilter}
      setIsFilteringByPendingValidation={mockSetIsFilteringByPendingValidation}
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
      setShowAddModal={mockSetShowAddModal}
      setSearchTerm={mockSetSearchTerm}
      pendingValidationFilter={false}
      setPendingValidationFilter={mockSetPendingValidationFilter}
      setIsFilteringByPendingValidation={mockSetIsFilteringByPendingValidation}
    />
  );

  const searchInput = getByPlaceholderText('Buscar');

  fireEvent.change(searchInput, { target: { value: 'test' } });

  expect(mockSetSearchTerm).toHaveBeenCalledWith('test');
});

test('calls setShowAddModal when Add button is clicked', () => {
  const { getByText } = render(
    <SearchList
      setShowAddModal={mockSetShowAddModal}
      setSearchTerm={mockSetSearchTerm}
      pendingValidationFilter={false}
      setPendingValidationFilter={mockSetPendingValidationFilter}
      setIsFilteringByPendingValidation={mockSetIsFilteringByPendingValidation}
    />
  );

  const addButton = getByText('+ADD');
  fireEvent.click(addButton);

  expect(mockSetShowAddModal).toHaveBeenCalled();
});

test('should render the filter component correctly', () => {
  const { getByText } = render(
    <SearchList
      setShowAddModal={mockSetShowAddModal}
      setSearchTerm={mockSetSearchTerm}
      pendingValidationFilter={false}
      setPendingValidationFilter={mockSetPendingValidationFilter}
      setIsFilteringByPendingValidation={mockSetIsFilteringByPendingValidation}
    />
  );

  const filterElement = getByText('Filtro');
  expect(filterElement).toBeInTheDocument();
});

test('should togle the dropdown menu with the filter options, when click on the filter component', () => {
  const { getByText, getByTestId } = render(
    <SearchList
      setShowAddModal={mockSetShowAddModal}
      setSearchTerm={mockSetSearchTerm}
      pendingValidationFilter={false}
      setPendingValidationFilter={mockSetPendingValidationFilter}
      setIsFilteringByPendingValidation={mockSetIsFilteringByPendingValidation}
    />
  );

  const filterElement = getByText('Filtro');
  fireEvent.click(filterElement);

  const filterAprovedOption = getByTestId('aproved-filter');
  const filterPendingOption = getByTestId('pending-filter');

  expect(filterAprovedOption).toBeInTheDocument();
  expect(filterPendingOption).toBeInTheDocument();
});

test('should remove the dropdown menu with the filter options, when click on the filter component', () => {
  const { getByText, getByTestId } = render(
    <SearchList
      setShowAddModal={mockSetShowAddModal}
      setSearchTerm={mockSetSearchTerm}
      pendingValidationFilter={false}
      setPendingValidationFilter={mockSetPendingValidationFilter}
      setIsFilteringByPendingValidation={mockSetIsFilteringByPendingValidation}
    />
  );

  const filterElement = getByText('Filtro');
  fireEvent.click(filterElement);

  const filterAprovedOption = getByTestId('aproved-filter');
  const filterPendingOption = getByTestId('pending-filter');

  expect(filterAprovedOption).toBeInTheDocument();
  expect(filterPendingOption).toBeInTheDocument();

  fireEvent.click(filterElement);

  expect(filterAprovedOption).not.toBeInTheDocument();
  expect(filterPendingOption).not.toBeInTheDocument();
});

test('should select the aproved option in the filter component', () => {
  const { getByText, getByTestId, queryByText } = render(
    <SearchList
      setShowAddModal={mockSetShowAddModal}
      setSearchTerm={mockSetSearchTerm}
      pendingValidationFilter={true}
      setPendingValidationFilter={mockSetPendingValidationFilter}
      setIsFilteringByPendingValidation={mockSetIsFilteringByPendingValidation}
    />
  );

  const filterElement = getByText('Filtro');
  fireEvent.click(filterElement);

  const filterAprovedOption = getByTestId('aproved-filter');
  const filterPendingOption = getByTestId('pending-filter');

  fireEvent.click(filterAprovedOption);

  expect(queryByText('Filtro')).not.toBeInTheDocument();
  expect(queryByText('Aprovado')).toBeInTheDocument();
  expect(queryByText('Pendente')).not.toBeInTheDocument();
  expect(filterAprovedOption).not.toBeInTheDocument();
  expect(filterPendingOption).not.toBeInTheDocument();
});

test('should select the pending option in the filter component', () => {
  const { getByText, getByTestId, queryByText } = render(
    <SearchList
      setShowAddModal={mockSetShowAddModal}
      setSearchTerm={mockSetSearchTerm}
      pendingValidationFilter={false}
      setPendingValidationFilter={mockSetPendingValidationFilter}
      setIsFilteringByPendingValidation={mockSetIsFilteringByPendingValidation}
    />
  );

  const filterElement = getByText('Filtro');
  fireEvent.click(filterElement);

  const filterAprovedOption = getByTestId('aproved-filter');
  const filterPendingOption = getByTestId('pending-filter');

  fireEvent.click(filterPendingOption);

  expect(queryByText('Filtro')).not.toBeInTheDocument();
  expect(queryByText('Aprovado')).not.toBeInTheDocument();
  expect(queryByText('Pendente')).toBeInTheDocument();
  expect(filterAprovedOption).not.toBeInTheDocument();
  expect(filterPendingOption).not.toBeInTheDocument();
  expect(mockSetPendingValidationFilter).toHaveBeenCalled();
});

test('should change the selection from aproved to pending by clicking in other filter option', () => {
  const { getByText, getByTestId, queryByText } = render(
    <SearchList
      setShowAddModal={mockSetShowAddModal}
      setSearchTerm={mockSetSearchTerm}
      pendingValidationFilter={false}
      setPendingValidationFilter={mockSetPendingValidationFilter}
      setIsFilteringByPendingValidation={mockSetIsFilteringByPendingValidation}
    />
  );

  const filterElement = getByText('Filtro');
  fireEvent.click(filterElement);

  const filterAprovedOption = getByTestId('aproved-filter');
  const filterPendingOption = getByTestId('pending-filter');

  fireEvent.click(filterAprovedOption);

  const selectedFilter = getByText('Pendente');
  fireEvent.click(selectedFilter);

  const filterAprovedOption2 = getByTestId('aproved-filter');
  const filterPendingOption2 = getByTestId('pending-filter');

  fireEvent.click(filterPendingOption2);

  expect(queryByText('Filtro')).not.toBeInTheDocument();
  expect(queryByText('Aprovado')).not.toBeInTheDocument();
  expect(queryByText('Pendente')).toBeInTheDocument();
  expect(filterAprovedOption).not.toBeInTheDocument();
  expect(filterPendingOption).not.toBeInTheDocument();
  expect(filterAprovedOption2).not.toBeInTheDocument();
  expect(filterPendingOption2).not.toBeInTheDocument();
  expect(mockSetPendingValidationFilter).toHaveBeenCalled();
});

test('should change the selection from pending to aproved by clicking in other filter option', () => {
  const { getByText, getByTestId, queryByText } = render(
    <SearchList
      setShowAddModal={mockSetShowAddModal}
      setSearchTerm={mockSetSearchTerm}
      pendingValidationFilter={true}
      setPendingValidationFilter={mockSetPendingValidationFilter}
      setIsFilteringByPendingValidation={mockSetIsFilteringByPendingValidation}
    />
  );

  const filterElement = getByText('Filtro');
  fireEvent.click(filterElement);

  const filterAprovedOption = getByTestId('aproved-filter');
  const filterPendingOption = getByTestId('pending-filter');

  fireEvent.click(filterPendingOption);

  const selectedFilter = getByText('Aprovado');
  fireEvent.click(selectedFilter);

  const filterAprovedOption2 = getByTestId('aproved-filter');
  const filterPendingOption2 = getByTestId('pending-filter');

  fireEvent.click(filterPendingOption2);

  expect(queryByText('Filtro')).not.toBeInTheDocument();
  expect(queryByText('Aprovado')).toBeInTheDocument();
  expect(queryByText('Pendente')).not.toBeInTheDocument();
  expect(filterAprovedOption).not.toBeInTheDocument();
  expect(filterPendingOption).not.toBeInTheDocument();
  expect(filterAprovedOption2).not.toBeInTheDocument();
  expect(filterPendingOption2).not.toBeInTheDocument();
  expect(mockSetPendingValidationFilter).toHaveBeenCalled();
});

test('should diplay a "x" button should appear after selecting the approved filter option', () => {
  const { getByText, getByTestId, queryByText } = render(
    <SearchList
      setShowAddModal={mockSetShowAddModal}
      setSearchTerm={mockSetSearchTerm}
      pendingValidationFilter={true}
      setPendingValidationFilter={mockSetPendingValidationFilter}
      setIsFilteringByPendingValidation={mockSetIsFilteringByPendingValidation}
    />
  );

  const filterElement = getByText('Filtro');
  fireEvent.click(filterElement);

  const filterAprovedOption = getByTestId('aproved-filter');
  const filterPendingOption = getByTestId('pending-filter');

  fireEvent.click(filterAprovedOption);

  const removeFilterElement = getByTestId('remove-filter');

  expect(removeFilterElement).toBeInTheDocument();
  expect(queryByText('Filtro')).not.toBeInTheDocument();
  expect(queryByText('Aprovado')).toBeInTheDocument();
  expect(queryByText('Pendente')).not.toBeInTheDocument();
  expect(filterAprovedOption).not.toBeInTheDocument();
  expect(filterPendingOption).not.toBeInTheDocument();
  expect(mockSetPendingValidationFilter).toHaveBeenCalled();
});

test('should diplay a "x" button should appear after selecting the pending filter option', () => {
  const { getByText, getByTestId, queryByText } = render(
    <SearchList
      setShowAddModal={mockSetShowAddModal}
      setSearchTerm={mockSetSearchTerm}
      pendingValidationFilter={false}
      setPendingValidationFilter={mockSetPendingValidationFilter}
      setIsFilteringByPendingValidation={mockSetIsFilteringByPendingValidation}
    />
  );

  const filterElement = getByText('Filtro');
  fireEvent.click(filterElement);

  const filterAprovedOption = getByTestId('aproved-filter');
  const filterPendingOption = getByTestId('pending-filter');

  fireEvent.click(filterPendingOption);

  const removeFilterElement = getByTestId('remove-filter');

  expect(removeFilterElement).toBeInTheDocument();
  expect(queryByText('Filtro')).not.toBeInTheDocument();
  expect(queryByText('Aprovado')).not.toBeInTheDocument();
  expect(queryByText('Pendente')).toBeInTheDocument();
  expect(filterAprovedOption).not.toBeInTheDocument();
  expect(filterPendingOption).not.toBeInTheDocument();
  expect(mockSetPendingValidationFilter).toHaveBeenCalled();
});

test('should remove the approved filter option after clicking in the "x" button', () => {
  const { getByText, getByTestId, queryByText } = render(
    <SearchList
      setShowAddModal={mockSetShowAddModal}
      setSearchTerm={mockSetSearchTerm}
      pendingValidationFilter={true}
      setPendingValidationFilter={mockSetPendingValidationFilter}
      setIsFilteringByPendingValidation={mockSetIsFilteringByPendingValidation}
    />
  );

  const filterElement = getByText('Filtro');
  fireEvent.click(filterElement);

  const filterAprovedOption = getByTestId('aproved-filter');
  const filterPendingOption = getByTestId('pending-filter');

  fireEvent.click(filterAprovedOption);

  const removeFilterElement = getByTestId('remove-filter');
  fireEvent.click(removeFilterElement);

  expect(removeFilterElement).not.toBeInTheDocument();
  expect(queryByText('Filtro')).toBeInTheDocument();
  expect(queryByText('Aprovado')).not.toBeInTheDocument();
  expect(filterAprovedOption).not.toBeInTheDocument();
  expect(filterPendingOption).not.toBeInTheDocument();
  expect(mockSetIsFilteringByPendingValidation).toBeCalledWith(false);
});

test('should remove the pending filter option after clicking in the "x" button', () => {
  const { getByText, getByTestId, queryByText } = render(
    <SearchList
      setShowAddModal={mockSetShowAddModal}
      setSearchTerm={mockSetSearchTerm}
      pendingValidationFilter={false}
      setPendingValidationFilter={mockSetPendingValidationFilter}
      setIsFilteringByPendingValidation={mockSetIsFilteringByPendingValidation}
    />
  );

  const filterElement = getByText('Filtro');
  fireEvent.click(filterElement);

  const filterAprovedOption = getByTestId('aproved-filter');
  const filterPendingOption = getByTestId('pending-filter');

  fireEvent.click(filterPendingOption);

  const removeFilterElement = getByTestId('remove-filter');
  fireEvent.click(removeFilterElement);

  expect(removeFilterElement).not.toBeInTheDocument();
  expect(queryByText('Filtro')).toBeInTheDocument();
  expect(queryByText('Pendente')).not.toBeInTheDocument();
  expect(filterAprovedOption).not.toBeInTheDocument();
  expect(filterPendingOption).not.toBeInTheDocument();
  expect(mockSetIsFilteringByPendingValidation).toBeCalledWith(false);
});

test('should check that the rotation of the icon is 0deg when the dropdown menu is closed', () => {
  const { getByTestId } = render(
    <DowniconsContainer isOpen={false} data-testid="downicons-container" />
  );
  const containerClosed = getByTestId('downicons-container');
  expect(containerClosed).toHaveStyle(`
    width: 24px;
    height: 24px;
    transition: transform 0.3s;
    transform: rotate(0deg);
  `);
});

test('should check that the rotation of the icon is 180deg when the dropdown menu is open', () => {
  const { getByTestId } = render(
    <DowniconsContainer isOpen={true} data-testid="downicons-container" />
  );
  const containerOpen = getByTestId('downicons-container');
  expect(containerOpen).toHaveStyle(`
    width: 24px;
    height: 24px;
    transition: transform 0.3s;
    transform: rotate(180deg);
  `);
});
