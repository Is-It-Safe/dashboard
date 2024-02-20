import React from 'react';
import { ReactComponent as LeftIcon } from '../../../assets/Icons/Left.svg';
import { ReactComponent as RightIcon } from '../../../assets/Icons/Right.svg';
import * as Styled from './Pagination.styles';

interface PaginationProps {
  currentPage: number;
  onPageChange: (newPage: number) => void;
  totalPages: number;
}

export function Pagination({
  currentPage,
  onPageChange,
  totalPages,
}: PaginationProps) {
  const handleNextPage = () => {
    onPageChange(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const renderPaginationButtons = () => {
    const visiblePageCount = 3;

    let startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(startPage + visiblePageCount - 1, totalPages);

    if (endPage - startPage + 1 < visiblePageCount) {
      startPage = Math.max(1, endPage - visiblePageCount + 1);
    }

    const pages = Array.from(
      { length: endPage - startPage + 1 },
      (_, index) => startPage + index
    );

    return (
      <Styled.Content>
        <Styled.ButtonIcon
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          <LeftIcon />
        </Styled.ButtonIcon>

        <Styled.NumberContainer>
          {pages.map((page) => (
            <Styled.PageButton
              key={page}
              onClick={() => onPageChange(page)}
              className={page === currentPage ? 'active' : ''}
            >
              {page}
            </Styled.PageButton>
          ))}
        </Styled.NumberContainer>

        <Styled.ButtonIcon
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          <RightIcon />
        </Styled.ButtonIcon>
      </Styled.Content>
    );
  };

  return (
    <Styled.PaginationContainer>
      {renderPaginationButtons()}
    </Styled.PaginationContainer>
  );
}
