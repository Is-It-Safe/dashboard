import React, { useState } from 'react';
import { ReactComponent as CLoseIcon } from '../../../assets/Icons/Closeicons.svg';
import { ReactComponent as FilterIcon } from '../../../assets/Icons/Filtericons.svg';
import { ReactComponent as DownIcon } from '../../../assets/Icons/Downicons.svg';
import { ReactComponent as SearchIcon } from '../../../assets/Icons/SearchIcon.svg';
import * as Styled from './SearchList.styles';

interface Props {
  setShowAddModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  pendingValidationFilter: boolean;
  setPendingValidationFilter: React.Dispatch<React.SetStateAction<boolean>>;
  setIsFilteringByPendingValidation: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

export function SearchList({
  setShowAddModal,
  setSearchTerm,
  pendingValidationFilter,
  setPendingValidationFilter,
  setIsFilteringByPendingValidation,
}: Readonly<Props>) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [filterName, setFilterName] = useState('Filtro');

  const handleDropdownToggle = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(event.target.value);
  };

  const handlePendingValidationFilter = (type: string) => {
    if (filterName === 'Aprovado' && type === 'aproved') return;
    if (filterName === 'Pendente' && type === 'pending') return;

    const newFilterValue = !pendingValidationFilter;
    setPendingValidationFilter(newFilterValue);

    if (pendingValidationFilter) setFilterName('Aprovado');
    else setFilterName('Pendente');

    setIsFilteringByPendingValidation(true);
  };

  const removePendingValidationFilter = () => {
    handleDropdownToggle();
    setFilterName('Filtro');
    setIsFilteringByPendingValidation(false);
  };

  const isFilteringByPendingValidation = filterName !== 'Filtro';

  return (
    <Styled.Container>
      <Styled.Title>Locais</Styled.Title>
      <Styled.Content>
        <Styled.SearchInputContainer>
          <Styled.IconContainer>
            <SearchIcon width={24} height={24} />
          </Styled.IconContainer>
          <Styled.SearchInput
            type="text"
            placeholder="Buscar"
            onChange={handleSearchInputChange}
          />
        </Styled.SearchInputContainer>
        <Styled.DropdownContainer onClick={handleDropdownToggle}>
          <Styled.DropdownButton>
            <FilterIcon width={24} height={24} />
            <Styled.DropdownButtonTitle>
              {filterName}
            </Styled.DropdownButtonTitle>
            {isFilteringByPendingValidation && (
              <Styled.CloseiconsContainer
                onClick={removePendingValidationFilter}
                data-testid="remove-filter"
              >
                <CLoseIcon width={18} height={18} />
              </Styled.CloseiconsContainer>
            )}
            <Styled.DowniconsContainer isOpen={isDropdownOpen}>
              <DownIcon width={24} height={24} />
            </Styled.DowniconsContainer>
          </Styled.DropdownButton>
          {isDropdownOpen && (
            <Styled.DropdownMenu>
              <Styled.DropdownButtonItem
                onClick={() => handlePendingValidationFilter('aproved')}
                data-testid="aproved-filter"
              >
                Aprovado
              </Styled.DropdownButtonItem>
              <Styled.DropdownButtonItem
                onClick={() => handlePendingValidationFilter('pending')}
                data-testid="pending-filter"
              >
                Pendente
              </Styled.DropdownButtonItem>
            </Styled.DropdownMenu>
          )}
        </Styled.DropdownContainer>
        <Styled.AddButton onClick={() => setShowAddModal(true)}>
          +ADD
        </Styled.AddButton>
      </Styled.Content>
    </Styled.Container>
  );
}
