import Sidebar from '../../components/sidebar/Sidebar';
import Header from '../../components/header/Header';
import * as Styled from './Reviews.styles';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useAuth } from '../../context/auth/AuthProvider';
import ReviewsList from '../../components/Reviews/ReviewList/ReviewList';
import {
  IReviewListResponse,
  getAllReviews,
} from '../..../../../services/review/all-reviews-service';
import { SearchList } from '../../components/Reviews/SearchList/SearchList';

const Reviews = () => {
  const [selectedId, setSelectedId] = useState<number>(0);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { accessToken } = useAuth();
  const reviewsList = useQuery<IReviewListResponse>('ReviewsList', () =>
    getAllReviews(accessToken)
  );

  return (
    <Styled.Container>
      <Sidebar></Sidebar>
      <Styled.HeaderContentContainer>
        <Header />
        <Styled.Content>
          <SearchList
            setSearchTerm={setSearchTerm}
            setSelectedRatings={setSelectedRatings}
            selectedRatings={selectedRatings}
          />
          <ReviewsList
            setSelectedId={setSelectedId}
            reviewList={reviewsList}
            searchTerm={searchTerm}
            selectedRatings={selectedRatings}
          />
        </Styled.Content>
      </Styled.HeaderContentContainer>
    </Styled.Container>
  );
};

export default Reviews;
