import React, { useState } from 'react';
import { ReactComponent as SearchIcon } from '../../../assets/Icons/SearchIcon.svg';
import { ReactComponent as DownIcon } from '../../../assets/Icons/Downicons.svg';
import * as Styled from './SearchList.styles';
import { RatingFilterDropdown } from '../RatingFilterDropdown/RatingFilterDropdown';
import { IReviewListItemResponse } from '../../../services/review/all-reviews-service';

interface Props {
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setSelectedRatings: React.Dispatch<React.SetStateAction<number[]>>;
  selectedRatings: number[];
}

export function SearchList({
  setSearchTerm,
  setSelectedRatings,
  selectedRatings,
}: Props) {
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
  };

  return (
    <Styled.Container>
      <Styled.TitleFilterContainer>
        <Styled.Title>Reviews</Styled.Title>
        <Styled.Content>
          <Styled.Filters>
            {['Todos', 'Pendentes', 'Aprovados', 'Reprovados'].map((filter) => (
              <Styled.Filter
                key={filter}
                isActive={filter === activeFilter}
                onClick={() => {
                  handleFilterClick(filter);
                }}
              >
                {filter}
              </Styled.Filter>
            ))}
          </Styled.Filters>
          <Styled.RatingFilterDropdown
            isOpen={isDropdownOpen}
            onClick={handleDropdownToggle}
          >
            <Styled.RatingFilterDropdownTitle>
              Classificação
            </Styled.RatingFilterDropdownTitle>
            <Styled.DownIconContainer>
              <DownIcon width={24} height={24} />
            </Styled.DownIconContainer>
          </Styled.RatingFilterDropdown>
          <RatingFilterDropdown
            isOpen={isDropdownOpen}
            setIsOpen={setIsDropdownOpen}
            selectedRatings={selectedRatings}
            setSelectedRatings={setSelectedRatings}
          />
        </Styled.Content>
      </Styled.TitleFilterContainer>
      <Styled.SearchInputContainer>
        <Styled.SerachIconContainer>
          <SearchIcon width={24} height={24} />
        </Styled.SerachIconContainer>
        <Styled.SearchInput
          type="text"
          placeholder="Buscar"
          onChange={handleSearchInputChange}
        />
      </Styled.SearchInputContainer>
    </Styled.Container>
  );
}
