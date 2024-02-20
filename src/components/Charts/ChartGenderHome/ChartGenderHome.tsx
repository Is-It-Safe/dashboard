import React, { useEffect, useRef } from 'react';
import { useQuery } from 'react-query';
import { useAuth } from '../../../context/auth/AuthProvider';
import { userRequest } from '../../../services/user/user-service';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import * as Styled from './ChartGenderHome.styles';

interface GenderData {
  count: number;
  name: string;
}
interface GenderChartData {
  gender: GenderData[];
}

export function ChartGenderHome() {
  const { accessToken } = useAuth();
  const { data: genderData, isLoading: isGenderDataLoading } =
    useQuery<GenderChartData>('genderData', () => userRequest(accessToken));

  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (
      !isGenderDataLoading &&
      genderData &&
      genderData.gender &&
      chartRef.current
    ) {
      const genderLabels = genderData.gender.map((item) => item.name);
      const genderCounts = genderData.gender.map((item) => item.count);

      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      const chartCanvas = chartRef.current;
      if (chartCanvas) {
        chartInstanceRef.current = new Chart(chartCanvas, {
          type: 'bar',
          data: {
            labels: genderLabels,
            datasets: [
              {
                label: 'Gender Count',
                data: genderCounts,
                backgroundColor: [
                  '#DEDCDF',
                  '#FF9311',
                  '#695CA8',
                  '#9D8DF4',
                  '#FDC47F',
                ],
                borderWidth: 0,
                borderRadius: 4,
                barThickness: 22,
              },
            ],
          },
          options: {
            indexAxis: 'y',
            scales: {
              y: {
                beginAtZero: true,
                border: {},
                grid: {
                  display: false,
                },
                ticks: {
                  font: {
                    family: 'Poppins',
                    size: 8,
                  },
                  color: '#241B5E',
                },
              },
              x: {
                beginAtZero: true,
                grid: {
                  color: '#9D8DF4',
                },
                border: {
                  dash: [4, 4],
                  color: '#FFF',
                },
                ticks: {
                  font: {
                    family: 'Poppins',
                    size: 8,
                  },
                  color: '#190A33',
                },
              },
            },
            plugins: {
              legend: {
                display: false,
              },
              datalabels: {
                align: 'right',
                color: '#241B5E',
                anchor: 'end',
                font: {
                  weight: 'bold',
                  family: 'Poppins',
                  size: 8,
                },
              },
            },
            aspectRatio: 6,
          },
          plugins: [ChartDataLabels],
        });
      }
    }
  }, [isGenderDataLoading, genderData]);

  return (
    <Styled.Container>
      {isGenderDataLoading || !genderData || !genderData.gender ? (
        <div>Loading...</div>
      ) : (
        <canvas ref={chartRef} />
      )}
    </Styled.Container>
  );
}
