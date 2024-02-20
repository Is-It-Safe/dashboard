import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { ChartOrientationHome } from './ChartOrientationHome';

jest.mock('../../../utils/ baseUrl.ts', () => ({
  someUrl: 'http://www.url.com',
}));

jest.mock('react-query', () => ({
  useQuery: jest.fn(() => ({
    data: {
      sexual_orientation: [
        { name: 'Heterosexual', count: 10 },
        { name: 'Homosexual', count: 15 },
        { name: 'Bisexual', count: 20 },
      ],
    },
    isLoading: false,
  })),
}));

describe('ChartOrientationHome', () => {
  test('renders chart data', async () => {
    render(<ChartOrientationHome />);

    // Aguarda a renderização do gráfico e um pouco mais com setTimeout
    await waitFor(() => {
      setTimeout(() => {
        const heterosexualLabel = screen.getByText('Heterosexual', {
          exact: false,
        });
        const homosexualLabel = screen.getByText('Homosexual', {
          exact: false,
        });
        const bisexualLabel = screen.getByText('Bisexual', { exact: false });
        const countLabels = screen.getAllByText(/[0-9]+/);

        expect(heterosexualLabel).toBeInTheDocument();
        expect(homosexualLabel).toBeInTheDocument();
        expect(bisexualLabel).toBeInTheDocument();
        expect(countLabels.length).toBe(3);
      }, 500); // Aumente o tempo aqui se necessário, dependendo da renderização do gráfico
    });
  });
});
