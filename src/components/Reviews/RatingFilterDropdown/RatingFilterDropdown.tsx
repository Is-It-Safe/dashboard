import React from 'react';
import * as Styled from './RatingFilterDropdown.styles';

interface RatingFilterDropdownProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedRatings: number[];
  setSelectedRatings: React.Dispatch<React.SetStateAction<number[]>>;
}

export const RatingFilterDropdown: React.FC<RatingFilterDropdownProps> = ({
  isOpen,
  setIsOpen,
  selectedRatings,
  setSelectedRatings,
}) => {
  const handleCheckboxChange = (rating: number) => {
    setSelectedRatings((prevRatings) => {
      if (prevRatings.includes(rating)) {
        return prevRatings.filter((r) => r !== rating);
      } else {
        return [...prevRatings, rating];
      }
    });
  };

  const renderStars = (rating: number) => {
    const totalStars = 5;
    const coloredStars = '★'.repeat(rating);
    const greyStars = '★'.repeat(totalStars - rating);

    return (
      <>
        <Styled.ColoredStars>{coloredStars}</Styled.ColoredStars>
        <Styled.GreyStars>{greyStars}</Styled.GreyStars>
      </>
    );
  };

  return (
    <Styled.RatingFilterDropdown
      isOpen={isOpen}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Styled.RatingFilterDropdownContent>
        {Array.from({ length: 5 }, (_, i) => i + 1).map((rating) => (
          <Styled.DropdownItem key={rating}>
            <Styled.Checkbox
              type="checkbox"
              checked={selectedRatings.includes(rating)}
              onChange={() => handleCheckboxChange(rating)}
            />
            {renderStars(rating)}
          </Styled.DropdownItem>
        ))}
      </Styled.RatingFilterDropdownContent>
    </Styled.RatingFilterDropdown>
  );
};
