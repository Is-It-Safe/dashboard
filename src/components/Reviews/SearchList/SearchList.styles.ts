import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TitleFilterContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background-color: #fcfcfd;
  padding: 24px 16px;
  font-size: 10px;
  width: 100%;
  height: 65px;
  border-bottom: 1px solid #efecfd;
  margin-top: 39px;
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const Filters = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 50px;
  margin-left: 40px;
  margin-top: 8px;
`;

export const Filter = styled.div<{ isActive: boolean }>`
  color: ${(props) => (props.isActive ? '#5c45ed' : '#2A2A46')};
  min-height: 100%;
  line-height: 550%;
  font-weight: ${(props) => (props.isActive ? '700' : '400')};
  cursor: pointer;
  box-sizing: border-box;

  border-bottom: 2px solid
    ${(props) => (props.isActive ? '#5c45ed' : 'transparent')};
`;

export const SearchInputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fdfcff;
  height: 50px;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
`;

export const SerachIconContainer = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
`;

export const DownIconContainer = styled.div`
  position: absolute;
  top: 6px;
  right: 15px;
`;
export const Title = styled.h1`
  color: var(--primrias-900, #241b5e);

  font-family: Poppins;
  font-size: 22px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

export const SearchInput = styled.input`
  width: 98%;
  height: 34px;
  background-color: #f4f5f9;
  border-radius: 100px;
  padding: 12.5px 40px;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--neutros-200, #efecfd);
`;

export const RatingFilterDropdown = styled.div<{ isOpen: boolean }>`
  position: relative;
  display: ${(props) => (props.isOpen ? 'none' : 'flex')};
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 130px;
  height: 30px;
  background-color: #fdfcff;
  padding: 16px;
  border: 1px solid #8b8bb1;
  border-radius: 30px;
  margin-top: 15px;
`;

export const RatingFilterDropdownTitle = styled.div`
  position: absolute;
  top: 9px;
  left: 20px;
`;
