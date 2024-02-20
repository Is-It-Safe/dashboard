/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import * as Styled from './ReviewListItem.styles';

export type IReviewListItemProps = {
  review: {
    id: number;
    profilePhoto: string;
    author: string;
    review: string;
    createdAt: string;
    myGrade: number;
  };
  isFirstItem: boolean;
};

export type IReviewListItem = React.DetailedHTMLProps<
  React.LiHTMLAttributes<HTMLLIElement>,
  HTMLLIElement
>;

const ReviewListItem: React.FC<IReviewListItemProps & IReviewListItem> = ({
  review,
  isFirstItem,
  ...liProps
}) => {
  return (
    <li {...liProps}>
      <Styled.ReviewListItemContainer>
        <Styled.ReviewAuthor>{review.author}</Styled.ReviewAuthor>
        <Styled.ReviewAuthor>{review.review}</Styled.ReviewAuthor>
        {/* <Styled.ReviewStatusText>
          {review.pendingValidation ? 'Pendente' : 'Aprovado'}
        </Styled.ReviewStatusText>
        <Styled.ReviewStatusIcon approved={!review.pendingValidation} /> */}
      </Styled.ReviewListItemContainer>
    </li>
  );
};

export default ReviewListItem;
