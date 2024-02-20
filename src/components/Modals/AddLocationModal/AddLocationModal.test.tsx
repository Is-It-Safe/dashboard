/* eslint-disable @typescript-eslint/no-empty-function */
import { render, screen, fireEvent } from '@testing-library/react';
import { AddLocationModal } from './AddLocationModal';
import { QueryClientProvider, QueryClient } from 'react-query';
import { AuthProvider } from '../../../context/auth/AuthProvider';

jest.mock('../../../services/get-logged-user/get-logged-user-service');
jest.mock('../../../utils/ baseUrl.ts', () => ({
  someUrl: 'http://www.url.com',
}));
jest.mock('../../../services/refresh-token/refresh-token-service');
jest.mock('../../../services/location/location-by-id-service');

jest.mock('../../../assets/Icons/Closeicons.svg', () => ({
  ReactComponent: () => <div data-testid="close-icon" />,
}));

describe('AddLocationModal', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AddLocationModal
            listRefetch={() => {}}
            showmodal={true}
            setShowModal={setShowModalMock}
          />
        </AuthProvider>
      </QueryClientProvider>
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
    queryClient.clear();
  });

  const setShowModalMock = jest.fn();

  it('renders the modal header correctly', () => {
    const titleText = 'Novo Local';

    expect(screen.getByText(titleText)).toBeInTheDocument();
  });

  it('triggers the setShowModal function when cancel button is clicked', () => {
    const cancelButton = screen.getByText('CANCELAR');
    fireEvent.click(cancelButton);

    expect(setShowModalMock).toHaveBeenCalledWith(false);
  });

  it('show errors in required inputs if user click on submit with all inputs empty', async () => {
    const nameInput = await screen.findByTestId('input-name');
    const typeInput = await screen.findByTestId('type-select');
    const cepInput = await screen.findByTestId('input-cep');
    const imgInput = await screen.findByTestId('img');
    const sendButton = screen.getByText('ENVIAR');

    expect(nameInput).toBeInTheDocument();
    expect(typeInput).toBeInTheDocument();
    expect(cepInput).toBeInTheDocument();
    expect(imgInput).toBeInTheDocument();
    expect(sendButton).toBeInTheDocument();

    fireEvent.click(sendButton);

    const allErrors = await screen.findAllByTestId('input-error');
    expect(allErrors).toHaveLength(3);
  });
});
