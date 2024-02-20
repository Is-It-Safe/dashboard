import React, { useEffect, useRef } from 'react';
import { useQuery } from 'react-query';
import { useAuth } from '../../../context/auth/AuthProvider';
import { userRequest } from '../../../services/user/user-service';
import { Chart } from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import * as Styled from './ChartOrientationHome.styles';

interface OrientationData {
  name: string;
  count: number;
}
interface OrientationChartData {
  sexual_orientation: OrientationData[];
}

export function ChartOrientationHome() {
  const { accessToken } = useAuth();
  const { data: orientationData, isLoading: isOrientationDataLoading } =
    useQuery<OrientationChartData>('orientationData', () =>
      userRequest(accessToken)
    );

  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (
      !isOrientationDataLoading &&
      orientationData &&
      orientationData.sexual_orientation &&
      chartRef.current
    ) {
      const orientationLabels = orientationData.sexual_orientation.map(
        (item) => item.name
      );
      const orientationCounts = orientationData.sexual_orientation.map(
        (item) => item.count
      );

      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      const chartCanvas = chartRef.current;
      if (chartCanvas && orientationLabels && orientationCounts) {
        chartInstanceRef.current = new Chart(chartCanvas, {
          type: 'bar',
          data: {
            labels: orientationLabels,
            datasets: [
              {
                label: 'Sexual Orientation',
                data: orientationCounts,
                backgroundColor: [
                  '#DCD6FC',
                  '#FF9311',
                  '#3700b3',
                  '#241b5e',
                  '#9D8DF4',
                  '#FDC47F',
                  '#DEDCDF',
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
  }, [isOrientationDataLoading, orientationData]);

  return (
    <Styled.Container>
      <canvas ref={chartRef} />
    </Styled.Container>
  );
}
