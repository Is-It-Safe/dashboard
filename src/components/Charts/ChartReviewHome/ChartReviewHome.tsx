import { useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { useAuth } from '../../../context/auth/AuthProvider';
import { Chart } from 'chart.js/auto';
import { ReactComponent as Righticons } from '../../../assets/Icons/Righticons.svg';
import { ReactComponent as Lefticons } from '../../../assets/Icons/Lefticons.svg';
import { reviewNumberRequest } from '../../../services/review-number/review-number-service';
import * as Styled from './ChartReviewHome.styles';
import Loading from '../../Loading/Loading';

enum ReviewChartMode {
  Month = 'month',
  Year = 'year',
}

interface CountByMonthData {
  count: number;
  month: string;
}

interface ReviewData {
  chart: {
    count_by_month: CountByMonthData[];
    count_by_year: number;
    year: string;
  }[];
  total_review: number;
}

export function ChartReviewHome() {
  const { accessToken } = useAuth();
  const { data, isLoading } = useQuery<ReviewData>('review', () =>
    reviewNumberRequest(accessToken)
  );

  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);
  const [chartMode, setChartMode] = useState<ReviewChartMode>(
    ReviewChartMode.Month
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

      if (chartMode === ReviewChartMode.Month) {
        chartData = data.chart.flatMap((item) =>
          item.count_by_month.map((monthData) => ({
            label: monthData.month,
            value: monthData.count,
          }))
        );
      } else if (chartMode === ReviewChartMode.Year) {
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
                  chartMode === ReviewChartMode.Month
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
                grid: {
                  color: '#9D8DF4',
                  lineWidth: 0.7,
                  drawTicks: false,
                },

                ticks: {
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
    return <Loading />;
  }

  const { chart } = data;

  const isFirstYear = selectedYear === chart[0].year;
  const isLastYear = selectedYear === chart[chart.length - 1].year;

  return (
    <Styled.Container>
      <Styled.Content>
        <Styled.Title>Reviews</Styled.Title>
        <Styled.Header>
          <Styled.SubHeader>
            <Styled.ButtonMonth
              selected={chartMode === ReviewChartMode.Month}
              onClick={() => setChartMode(ReviewChartMode.Month)}
            >
              Mês
            </Styled.ButtonMonth>
            <Styled.ButtonYear
              selected={chartMode === ReviewChartMode.Year}
              onClick={() => setChartMode(ReviewChartMode.Year)}
            >
              Ano
            </Styled.ButtonYear>
          </Styled.SubHeader>
          {chartMode === ReviewChartMode.Year && (
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
