/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import * as Styled from './LocationListItem.styles';
import { ReactComponent as BinIcon } from '../../../assets/Icons/Bin.svg';
import { ReactComponent as TeamIcon } from '../../../assets/Icons/Team.svg';
import imageList from '../../../assets/imageList.png';

export type ILocationListItemProps = {
  location: {
    id: number;
    name: string;
    imgUrl?: string;
    pendingValidation: boolean;
  };
  onEdit: (
    id: number,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  onDelete: (
    id: number,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  onShow: (
    id: number,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  isFirstItem: boolean;
};

export type ILocationListItem = React.DetailedHTMLProps<
  React.LiHTMLAttributes<HTMLLIElement>,
  HTMLLIElement
>;

const LocationListItem: React.FC<
  ILocationListItemProps & ILocationListItem
> = ({ location, onEdit, onDelete, onShow, isFirstItem, ...liProps }) => {
  return (
    <li {...liProps} onClick={(e: any) => onShow(location.id, e)}>
      {isFirstItem && (
        <Styled.LocationTitle>
          {location.name.charAt(0).toUpperCase()}
        </Styled.LocationTitle>
      )}
      <Styled.LocationListItemContainer>
        <Styled.LocationImageContainer>
          <Styled.LocationImage
            src={location.imgUrl ? location.imgUrl : imageList}
          />
        </Styled.LocationImageContainer>
        <Styled.LocationName>{location.name}</Styled.LocationName>
        <Styled.LocationStatusText>
          {location.pendingValidation ? 'Pendente' : 'Aprovado'}
        </Styled.LocationStatusText>
        <Styled.LocationStatusIcon approved={!location.pendingValidation} />
        <Styled.EditButton onClick={(e: any) => onEdit(location.id, e)}>
          <TeamIcon />
        </Styled.EditButton>
        <Styled.DeleteButton onClick={(e: any) => onDelete(location.id, e)}>
          <BinIcon />
        </Styled.DeleteButton>
      </Styled.LocationListItemContainer>
    </li>
  );
};

export default LocationListItem;
