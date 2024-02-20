/* eslint-disable @typescript-eslint/no-empty-function */
import {
  render,
  screen,
  fireEvent,
  findAllByTestId,
} from '@testing-library/react';
import { EditLocationModal } from './EditLocationModal';
import { QueryClientProvider, QueryClient } from 'react-query';
import { AuthProvider } from '../../../context/auth/AuthProvider';
import React from 'react';
import * as ReactQuery from 'react-query';
import { Input } from '../../Input/Input';

jest.mock('../../../services/get-logged-user/get-logged-user-service');
jest.mock('../../../utils/ baseUrl.ts', () => ({
  someUrl: 'http://www.url.com',
}));
jest.mock('../../../services/refresh-token/refresh-token-service');
jest.mock('../../../services/location/location-by-id-service');

jest.mock('../../../services/location/save-location-service.ts');
jest.mock('../../../services/location/all-location-service.ts');

jest.mock('../../../assets/Icons/Closeicons.svg', () => ({
  ReactComponent: () => <div data-testid="close-icon" />,
}));

describe('EditLocationModal', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <EditLocationModal
            id={1}
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
  const locationsRefreshMock = jest.fn();

  it('renders the modal header correctly', () => {
    const titleText = 'Editar';

    expect(screen.getByText(titleText)).toBeInTheDocument();
  });

  it('triggers the setShowModal function when cancel button is clicked', () => {
    const cancelButton = screen.getByText('CANCELAR');
    fireEvent.click(cancelButton);

    expect(setShowModalMock).toHaveBeenCalledWith(false);
  });

  it('show errors in required inputs if user click on submit with all inputs empty', async () => {
    const nameInput = await screen.findByTestId('input-name');
    const typeInput = await screen.findByTestId('select');
    const cepInput = await screen.findByTestId('input-cep');
    const addressInput = await screen.findByTestId('input-endereco');
    const latitudeInput = await screen.findByTestId('input-latitude');
    const longitudeInput = await screen.findByTestId('input-longitude');
    const imgInput = await screen.findByTestId('img');
    const sendButton = screen.getByText('ENVIAR');

    expect(nameInput).toBeInTheDocument();
    expect(typeInput).toBeInTheDocument();
    expect(cepInput).toBeInTheDocument();
    expect(addressInput).toBeInTheDocument();
    expect(latitudeInput).toBeInTheDocument();
    expect(longitudeInput).toBeInTheDocument();
    expect(imgInput).toBeInTheDocument();
    expect(sendButton).toBeInTheDocument();

    fireEvent.click(sendButton);

    const allErrors = await screen.findAllByTestId('input-error');
    expect(allErrors).toHaveLength(3);
  });
});
