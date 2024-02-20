import { render, screen } from '@testing-library/react';
import { ChartLocationHome } from './ChartLocationHome';
import { QueryClient, QueryClientProvider } from 'react-query';

jest.mock('../../../assets/Icons/Righticons.svg', () => 'RightIcon');
jest.mock('../../../assets/Icons/Lefticons.svg', () => 'LeftIcon');
jest.mock('../../../utils/ baseUrl.ts', () => ({
  someUrl: 'http://www.url.com',
}));
jest.mock('../../../services/location/location-service.ts');

describe('ChartLocation', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient();
  });

  test('renders loading state', async () => {
    jest.mock('react-query', () => ({
      useQuery: jest.fn((key, fetchData) => ({
        data: null,
        isLoading: true,
      })),
    }));

    render(
      <QueryClientProvider client={queryClient}>
        <ChartLocationHome />
      </QueryClientProvider>
    );
    const loadingText = await screen.findByTestId('spinner-container');
    expect(loadingText).toBeInTheDocument();
  });

  test('renders chart data', () => {
    const mockChartData = {
      chart: [
        {
          count_by_month: [
            { count: 10, month: 'Jan' },
            { count: 15, month: 'Feb' },
            { count: 20, month: 'Mar' },
          ],
          count_by_year: 45,
          year: '2022',
        },
      ],
      total_locations: 45,
    };

    jest.mock('react-query', () => ({
      useQuery: jest.fn(() => ({
        data: mockChartData,
        isLoading: false,
      })),
    }));

    render(
      <QueryClientProvider client={queryClient}>
        <ChartLocationHome />
      </QueryClientProvider>
    );
  });
});
