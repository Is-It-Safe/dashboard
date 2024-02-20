import styled from 'styled-components';

interface LocationStatusProps {
  approved: boolean;
}

export const LocationTitle = styled.h1`
  color: #190a33;
  font-size: 12px;
  font-weight: 600;
  padding-bottom: 12px;
  margin-top: 12px;
  text-transform: uppercase;
  padding-top: 8px;
  border-top: 2px solid var(--neutros-200, #efecfd);
  background: var(--neutros-100, #faf9ff);

  padding-left: 24px;
`;

export const LocationListItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border-top: 1px solid var(--neutros-200, #efecfd);
  padding-left: 24px;
  height: 80px;
`;

export const LocationImageContainer = styled.div`
  width: 100px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 24px;
`;

export const LocationImage = styled.img`
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
`;

export const LocationName = styled.p`
  margin-right: auto;
  color: var(--neutros-900, #190a33);
  font-size: 14px;
  font-weight: 700;
  line-height: 16px;
  letter-spacing: 0.15px;
  cursor: pointer;
`;

export const LocationStatusText = styled.span`
  margin-right: 23px;
  color: '#190A33';
  font-size: 12px;
`;

export const LocationStatusIcon = styled.div<LocationStatusProps>`
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 28px;
  background-color: ${({ approved }) => (approved ? '#2AF026' : '#FF9311')};
`;

export const EditButton = styled.button`
  background-color: #fdfcff;
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
`;

export const DeleteButton = styled.button`
  background-color: #fdfcff;
  color: white;
  padding-right: 8px;
  border: none;
  border-radius: 4px;
  margin-right: 14px;
`;
