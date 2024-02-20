import { useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { useAuth } from '../../../context/auth/AuthProvider';
import { locationRequest } from '../../../services/location/location-service';
import { Chart } from 'chart.js/auto';
import { ReactComponent as Righticons } from '../../../assets/Icons/Righticons.svg';
import { ReactComponent as Lefticons } from '../../../assets/Icons/Lefticons.svg';
import * as Styled from './ChartLocationHome.styles';
import Loading from '../../Loading/Loading';

enum LocationChartMode {
  Month = 'month',
  Year = 'year',
}

interface CountByMonthData {
  count: number;
  month: string;
}

export interface LocationChartData {
  chart: {
    count_by_month: CountByMonthData[];
    count_by_year: number;
    year: string;
  }[];
  total_locations: number;
}

export function ChartLocationHome() {
  const { accessToken } = useAuth();
  const { data, isLoading } = useQuery<LocationChartData>('location', () =>
    locationRequest(accessToken)
  );

  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);
  const [chartMode, setChartMode] = useState<LocationChartMode>(
    LocationChartMode.Month
  );
  const [selectedYear, setSelectedYear] = useState<string>('2023');

  const handleTooltipRadius = (context: any) => {
    if (context.tooltipActive) {
      return 6;
    }
    return 0;
  };

  useEffect(() => {
    if (!isLoading && data && chartRef.current) {
      let chartData: { label: string; value: number }[] = [];

      if (chartMode === LocationChartMode.Month) {
        chartData = data.chart.flatMap((item) =>
          item.count_by_month.map((monthData) => ({
            label: monthData.month,
            value: monthData.count,
          }))
        );
      } else if (chartMode === LocationChartMode.Year) {
        const selectedYearData = data.chart.find(
          (item) => item.year === selectedYear
        );

        if (selectedYearData) {
          chartData = selectedYearData.count_by_month.map((monthData) => ({
            label: monthData.month,
            value: monthData.count,
          }));
        } else {
          chartData = [];
        }
      }

      const labels = chartData.map((item) => item.label);
      const counts = chartData.map((item) => item.value);

      const largestElement = (arr: string[]) => {
        arr.sort((a, b) => a.localeCompare(b));
        return arr[arr.length - 1];
      };

      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      const chartCanvas = chartRef.current;

      if (chartCanvas) {
        chartInstanceRef.current = new Chart(chartCanvas, {
          type: 'line',
          data: {
            labels,
            datasets: [
              {
                label:
                  chartMode === LocationChartMode.Month
                    ? 'Count by Month'
                    : `Count by Year (${selectedYear})`,
                data: counts,
                borderColor: '#4937BE',
                borderWidth: 1,
                pointBackgroundColor: '#4937BE',
                tension: 0.4,
                hoverBorderColor: '#4937BE',
              },
            ],
          },
          options: {
            interaction: {
              mode: 'index',
              intersect: false,
            },
            scales: {
              y: {
                offset: true,
                border: {
                  color: '#FDFCFF',
                  dash: [4, 4],
                },

                beginAtZero: true,
                min: 0,
                max: largestElement(labels),
                grid: {
                  color: '#9D8DF4',
                  lineWidth: 0.7,
                  drawTicks: false,
                },

                ticks: {
                  stepSize: 1,

                  callback: (value) => value,
                  font: {
                    size: 8,
                    family: 'Poppins',
                  },
                  color: '#878787',
                },
              },

              x: {
                offset: true,
                border: {
                  color: '#FDFCFF',
                  dash: [4, 4],
                },
                grid: {
                  display: false,
                  color: '#9D8DF4',
                },
                ticks: {
                  font: {
                    size: 8,
                    family: 'Poppins',
                  },
                  color: '#190A33',
                },
              },
            },

            plugins: {
              tooltip: {
                callbacks: {
                  label: (context) => context.parsed.y.toString(),
                },
              },
              legend: {
                display: false,
              },
            },

            elements: {
              point: {
                radius: handleTooltipRadius,
                hoverRadius: 8,
              },
            },
            aspectRatio: 2.4,
          },
        });
      }
    }
  }, [isLoading, data, chartMode, selectedYear]);

  const handleYearChange = (increment: number) => {
    const currentYear = Number(selectedYear);
    const nextYear = currentYear + increment;
    setSelectedYear(String(nextYear));
  };

  if (isLoading || !data || !data.chart || data.chart.length === 0) {
    return <Loading data-testid="loading-spinner" />;
  }
  const { chart } = data;

  const isFirstYear = selectedYear === chart[0].year;
  const isLastYear = selectedYear === chart[chart.length - 1].year;

  return (
    <Styled.Container>
      <Styled.Content>
        <Styled.Title>Locais</Styled.Title>
        <Styled.Header>
          <Styled.SubHeader>
            <Styled.ButtonMonth
              selected={chartMode === LocationChartMode.Month}
              onClick={() => setChartMode(LocationChartMode.Month)}
            >
              Mês
            </Styled.ButtonMonth>
            <Styled.ButtonYear
              selected={chartMode === LocationChartMode.Year}
              onClick={() => setChartMode(LocationChartMode.Year)}
            >
              Ano
            </Styled.ButtonYear>
          </Styled.SubHeader>
          {chartMode === LocationChartMode.Year && (
            <Styled.ButtonContainer>
              <Styled.ArrowButton
                onClick={() => handleYearChange(-1)}
                disabled={isFirstYear}
              >
                <Lefticons width={16} height={16} />
              </Styled.ArrowButton>
              <Styled.YearButton
                onClick={() =>
                  setSelectedYear(isFirstYear ? chart[1].year : chart[0].year)
                }
                selected={isFirstYear || selectedYear === chart[1].year}
              >
                {selectedYear}
              </Styled.YearButton>
              <Styled.ArrowButton
                onClick={() => handleYearChange(1)}
                disabled={isLastYear}
              >
                <Righticons width={16} height={16} />
              </Styled.ArrowButton>
            </Styled.ButtonContainer>
          )}
        </Styled.Header>
      </Styled.Content>
      <canvas ref={chartRef} />
    </Styled.Container>
  );
}
