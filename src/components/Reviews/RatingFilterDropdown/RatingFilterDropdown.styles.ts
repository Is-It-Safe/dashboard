import styled from 'styled-components';

export const Dropdown = styled.div<{ isOpen: boolean }>`
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  position: absolute;
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  z-index: 10;
  width: 100%;
  padding: 8px;
`;

export const DropdownItem = styled.div`
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #f3f3f3;
  }
`;

export const Checkbox = styled.input`
  margin-right: 10px;
`;

const Star = styled.span`
  font-size: 16px; // Adjust the size of the stars as needed
`;

export const ColoredStars = styled(Star)`
  color: #5c45ed; // Use the purple color you have in your design
`;

export const GreyStars = styled(Star)`
  color: #cccccc; // A grey color for inactive stars
`;

export const RatingFilterDropdown = styled.div<{ isOpen: boolean }>`
  display: ${(props) => (props.isOpen ? 'flex' : 'none')};
  position: absolute;
  top: 30px; // Adjust if needed to position the dropdown correctly
  right: 0;
  background-color: #f4f5f9;
  border-radius: 18px;
  padding: 16px;
  z-index: 2; // Ensure this is above other components but below modal overlays, etc.
`;

export const RatingFilterDropdownContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
