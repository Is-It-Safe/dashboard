import React, { useState } from 'react';
import Loading from './../../Loading/Loading';
import { IReviewListResponse } from '../../../services/review/all-reviews-service';
import { UseQueryResult } from 'react-query';
import { Pagination } from '../Pagination/Pagination';
import * as Styled from './ReviewList.styles';
import ReviewListItem, {
  IReviewListItemProps,
} from '../ReviewListItem/ReviewListItem';

interface Props {
  setSelectedId: React.Dispatch<React.SetStateAction<number>>;
  reviewList: UseQueryResult<IReviewListResponse, unknown>;
  searchTerm: string;
  selectedRatings: number[];
}
const ReviewList: React.FC<Props> = ({
  setSelectedId,
  reviewList,
  searchTerm,
  selectedRatings,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(11);

  const filteredReviews = reviewList.data?.content
    ?.filter(
      (review) =>
        searchTerm === '' ||
        review.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.review.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(
      (review) =>
        selectedRatings.length === 0 ||
        selectedRatings.includes(Math.floor(review.myGrade))
    );

  const totalPages = Math.ceil((filteredReviews?.length || 0) / itemsPerPage);
  filteredReviews?.sort((a, b) => a.author.localeCompare(b.author));

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleReviews = filteredReviews?.slice(startIndex, endIndex);

  if (reviewList.isLoading) {
    return <Loading />;
  }

  return (
    <Styled.Container>
      <Styled.ContentContainer>
        <Styled.Content>
          <Styled.ReviewListContainer>
            <ul>
              {visibleReviews?.map((review, index) => {
                const isFirstItem = index === 0;
                return (
                  <ReviewListItem
                    key={review.id}
                    review={review as IReviewListItemProps['review']}
                    isFirstItem={isFirstItem}
                  />
                );
              })}
            </ul>
          </Styled.ReviewListContainer>
        </Styled.Content>
      </Styled.ContentContainer>
      <Pagination
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        totalPages={totalPages}
      />
    </Styled.Container>
  );
};

export default ReviewList;
