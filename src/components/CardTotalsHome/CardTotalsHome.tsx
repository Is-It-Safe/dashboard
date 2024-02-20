import { useEffect, useState } from 'react';
import { locationRequest } from '../../services/location/location-service';
import { userRequest } from '../../services/user/user-service';
import { reviewNumberRequest } from '../../services/review-number/review-number-service'; // Importe a função reviewNumberRequest
import { useAuth } from '../../context/auth/AuthProvider';
import { ReactComponent as Up } from '../../assets/Icons/Up.svg';
import { ReactComponent as PilNed } from '../../assets/Icons/PilNed.svg';
import * as Styled from './CardTotalsHome.styles';

export function CardTotalsHome() {
  const { accessToken } = useAuth();
  const [totalLocations, setTotalLocations] = useState<number | null>(null);
  const [totalUsers, setTotalUsers] = useState<number | null>(null);
  const [totalReviews, setTotalReviews] = useState<number | null>(null);

  useEffect(() => {
    const fetchTotalData = async () => {
      try {
        if (accessToken) {
          const locationsResponse = await locationRequest(accessToken);
          setTotalLocations(locationsResponse.total_locations);

          const usersResponse = await userRequest(accessToken);
          setTotalUsers(usersResponse.total_users);

          const reviewsResponse = await reviewNumberRequest(accessToken);
          setTotalReviews(reviewsResponse.total_review);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setTotalLocations(null);
        setTotalUsers(null);
        setTotalReviews(null);
      }
    };

    fetchTotalData();
  }, [accessToken]);

  return (
    <Styled.Container>
      <Styled.Content>
        <Styled.Col>
          <Styled.Title>Usuários totais</Styled.Title>
          <Styled.Total>{totalUsers}</Styled.Total>
        </Styled.Col>
        <Styled.PercentageContainer>
          <Up />
          <Styled.Percentage>12%</Styled.Percentage>
        </Styled.PercentageContainer>
      </Styled.Content>

      <Styled.Content>
        <Styled.Col>
          <Styled.Title>Locais</Styled.Title>
          <Styled.Total>{totalLocations}</Styled.Total>
        </Styled.Col>
        <Styled.PercentageContainer>
          <Up />
          <Styled.Percentage>15%</Styled.Percentage>
        </Styled.PercentageContainer>
      </Styled.Content>

      <Styled.Content>
        <Styled.Col>
          <Styled.Title>Reviews</Styled.Title>
          <Styled.Total>{totalReviews}</Styled.Total>
        </Styled.Col>
        <Styled.PercentageContainer>
          <PilNed />
          <Styled.Percentage style={{ color: 'red' }}>-2%</Styled.Percentage>
        </Styled.PercentageContainer>
      </Styled.Content>
    </Styled.Container>
  );
}
