import { useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { useAuth } from '../../../context/auth/AuthProvider';
import { ChartOrientationHome } from '../ChartOrientationHome/ChartOrientationHome';
import { ChartGenderHome } from '../ChartGenderHome/ChartGenderHome';
import { userRequest } from '../../../services/user/user-service';
import { Chart } from 'chart.js/auto';
import { ReactComponent as Righticons } from '../../../assets/Icons/Righticons.svg';
import { ReactComponent as Lefticons } from '../../../assets/Icons/Lefticons.svg';
import { ReactComponent as Downicons } from '../../../assets/Icons/Downicons.svg';
import * as Styled from './ChartUserHome.styles';
import Loading from '../../Loading/Loading';

enum UserChartMode {
  Month = 'month',
  Year = 'year',
}

interface MonthData {
  month: string;
  new_users: number;
  sum_users: number;
}

interface ChartData {
  count_by_year: number;
  sum_and_count_by_month: MonthData[];
  year: string;
}

interface ApiResponse {
  chart: ChartData[];
}

export function ChartUserHome() {
  const { accessToken } = useAuth();
  const { data, isLoading } = useQuery<ApiResponse>('userData', () =>
    userRequest(accessToken)
  );

  const [selectedDropdownItem, setSelectedDropdownItem] = useState('Geral');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState<string>('2023');
  const [showGenderChart, setShowGenderChart] = useState(false);
  const [showOrientationChart, setShowOrientationChart] = useState(false);
  const [shouldShowDefaultChart, setShouldShowDefaultChart] = useState(true);
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);
  const [chartMode, setChartMode] = useState<UserChartMode>(
    UserChartMode.Month
  );

  const handleTooltipRadius = (context: any) => (context.tooltipActive ? 6 : 0);

  const handleDropdownToggle = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const handleReturnToDefaultChart = () => {
    setShouldShowDefaultChart(true);
    setShowGenderChart(false);
    setShowOrientationChart(false);
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }
  };

  const handleDropdownItemClick = (item: string) => {
    setSelectedDropdownItem(item);
    setIsDropdownOpen(false);

    if (item === 'ID.Gênero') {
      setShowGenderChart(true);
      setShowOrientationChart(false);
      setShouldShowDefaultChart(false);
    } else if (item === 'Orientação') {
      setShowGenderChart(false);
      setShowOrientationChart(true);
      setShouldShowDefaultChart(false);
    } else if (item === 'Geral') {
      handleReturnToDefaultChart();
    }
  };

  useEffect(() => {
    if (!isLoading && data && chartRef.current) {
      let chartData: {
        label: string;
        newUsers: number;
        totalUsers: number;
      }[] = [];

      if (chartMode === UserChartMode.Month) {
        chartData =
          data.chart?.flatMap((item) =>
            item.sum_and_count_by_month.map((monthData) => ({
              label: monthData.month,
              newUsers: monthData.new_users,
              totalUsers: monthData.sum_users,
            }))
          ) || [];
      } else if (chartMode === UserChartMode.Year) {
        const selectedYearData = data.chart?.find(
          (item) => item.year === selectedYear
        );

        if (selectedYearData) {
          chartData = selectedYearData.sum_and_count_by_month.map(
            (monthData) => ({
              label: monthData.month,
              newUsers: monthData.new_users,
              totalUsers: monthData.sum_users,
            })
          );
        } else {
          chartData = [];
        }
      }
      const labels = chartData.map((item) => item.label);
      const newUsers = chartData.map((item) => item.newUsers);
      const totalUsers = chartData.map((item) => item.totalUsers);

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
                label: 'Novos Usuários',
                data: newUsers,
                borderColor: '#FF9311',
                backgroundColor: '#FF9311',
                borderWidth: 1,
                pointBackgroundColor: '#FF9311',
                tension: 0.4,
                hoverBorderColor: '#FF9311',
              },
              {
                label: 'Usuários Totais',
                data: totalUsers,
                borderColor: '#585EEF',
                backgroundColor: '#30019A',
                borderWidth: 1,
                pointBackgroundColor: '#30019A',
                tension: 0.4,
                hoverBorderColor: '#30019A',
              },
            ],
          },
          options: {
            interaction: {
              mode: 'nearest',
              intersect: false,
            },
            scales: {
              y: {
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
                  stepSize: 1,
                  crossAlign: 'far',
                  maxTicksLimit: 5,
                  callback: (value) => value,
                  font: {
                    size: 8,
                    family: 'Poppins',
                  },
                  color: '#878787',
                  padding: 6,
                },
              },
              x: {
                offset: true,
                grid: {
                  display: false,
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
              tooltip: {},
              legend: {
                display: true,
                position: 'top',
                align: 'end',

                labels: {
                  boxWidth: 12,
                  boxHeight: 12,

                  color: '#190A33',
                  font: {
                    size: 8,
                    family: 'Poppins',
                    style: 'normal',
                    lineHeight: 16,
                  },
                  padding: 16,
                },
              },
            },
            elements: {
              point: {
                radius: handleTooltipRadius,
                hoverRadius: 8,
              },
            },
            aspectRatio: 6,
          },
        });
      }
    }
  }, [isLoading, data, chartMode, selectedYear, shouldShowDefaultChart]);

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
        <Styled.Title>Usuários</Styled.Title>
        <Styled.Header>
          {shouldShowDefaultChart && (
            <Styled.SubHeader>
              <Styled.ButtonMonth
                selected={chartMode === UserChartMode.Month}
                onClick={() => setChartMode(UserChartMode.Month)}
              >
                Mês
              </Styled.ButtonMonth>
              <Styled.ButtonYear
                selected={chartMode === UserChartMode.Year}
                onClick={() => setChartMode(UserChartMode.Year)}
              >
                Ano
              </Styled.ButtonYear>
            </Styled.SubHeader>
          )}
          {shouldShowDefaultChart && chartMode === UserChartMode.Year && (
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
          <Styled.DropdownContainer>
            <Styled.DropdownButton onClick={handleDropdownToggle}>
              {selectedDropdownItem}
              <Styled.DowniconsContainer isOpen={false}>
                <Downicons width={16} height={16} />
              </Styled.DowniconsContainer>
            </Styled.DropdownButton>
            {isDropdownOpen && (
              <Styled.DropdownMenu>
                <Styled.DropdownButtonItem
                  onClick={() => handleDropdownItemClick('Geral')}
                >
                  Geral
                </Styled.DropdownButtonItem>
                <Styled.DropdownButtonItem
                  onClick={() => handleDropdownItemClick('ID.Gênero')}
                >
                  ID.Gênero
                </Styled.DropdownButtonItem>
                <Styled.DropdownButtonItem
                  onClick={() => handleDropdownItemClick('Orientação')}
                >
                  Orientação
                </Styled.DropdownButtonItem>
              </Styled.DropdownMenu>
            )}
          </Styled.DropdownContainer>
        </Styled.Header>
      </Styled.Content>

      {shouldShowDefaultChart ? <canvas ref={chartRef} /> : null}
      {showGenderChart ? <ChartGenderHome /> : null}
      {showOrientationChart ? <ChartOrientationHome /> : null}
    </Styled.Container>
  );
}
