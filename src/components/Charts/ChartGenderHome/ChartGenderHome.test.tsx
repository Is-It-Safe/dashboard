import { render, screen, waitFor } from '@testing-library/react';
import { ChartGenderHome } from './ChartGenderHome';

jest.mock('../../../services/user/user-service');
jest.mock('../../../utils/ baseUrl.ts', () => ({
  someUrl: 'http://www.url.com',
}));

jest.mock('react-query', () => ({
  useQuery: jest.fn((key, fetchData) => ({
    data: fetchData(),
    isLoading: false,
  })),
}));

describe('ChartGenderHome', () => {
  test('renders chart data', async () => {
    const mockGenderData = {
      gender: [
        { name: 'Male', count: 10 },
        { name: 'Female', count: 15 },
        { name: 'Other', count: 20 },
      ],
    };

    jest.mock('react-query', () => ({
      useQuery: jest.fn(() => ({
        data: mockGenderData,
        isLoading: false,
      })),
    }));

    render(<ChartGenderHome />);

    await waitFor(() => {
      setTimeout(() => {
        const maleLabel = screen.getByText('Male');
        const femaleLabel = screen.getByText('Female');
        const otherLabel = screen.getByText('Other');
        const countLabels = screen.getAllByText(/[0-9]+/);

        expect(maleLabel).toBeInTheDocument();
        expect(femaleLabel).toBeInTheDocument();
        expect(otherLabel).toBeInTheDocument();
        expect(countLabels.length).toBe(3);
      }, 100);
    });
  });
});
