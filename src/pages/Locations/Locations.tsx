import Sidebar from '../../components/sidebar/Sidebar';
import Header from '../../components/header/Header';
import * as Styled from './Locations.styles';
import { ShowLocationModal } from '../../components/Modals/ShowLocationModal/ShowLocationModal';
import { EditLocationModal } from '../../components/Modals/EditLocationModal/EditLocationModal';
import { AddLocationModal } from '../../components/Modals/AddLocationModal/AddLocationModal';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useAuth } from '../../context/auth/AuthProvider';
import { DeleteLocationModal } from '../../components/Modals/DeleteLocationModal/DeleteLocationModal';
import LocationList from '../../components/Locations/LocationList/LocationList';
import {
  ILocationListResponse,
  getAllLocations,
} from '../..../../../services/location/all-location-service';
import { SearchList } from '../../components/Locations/SearchList/SearchList';
const Locations = () => {
  const [showShowModal, setShowShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedId, setSelectedId] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [pendingValidationFilter, setPendingValidationFilter] = useState(true);
  const [isFilteringByPendingValidation, setIsFilteringByPendingValidation] =
    useState(false);
  const { accessToken } = useAuth();
  const locationList = useQuery<ILocationListResponse>('locationList', () =>
    getAllLocations(accessToken)
  );

  const ListRefetch = () => {
    locationList.refetch();
  };

  return (
    <Styled.Container>
      <Sidebar></Sidebar>
      <Styled.HeaderContentContainer>
        <Header />
        <Styled.Content>
          <SearchList
            setShowAddModal={setShowAddModal}
            setSearchTerm={setSearchTerm}
            pendingValidationFilter={pendingValidationFilter}
            setPendingValidationFilter={setPendingValidationFilter}
            setIsFilteringByPendingValidation={
              setIsFilteringByPendingValidation
            }
          />
          <LocationList
            setShowShowModal={setShowShowModal}
            setShowEditModal={setShowEditModal}
            setShowDeleteModal={setShowDeleteModal}
            setSelectedId={setSelectedId}
            locationList={locationList}
            searchTerm={searchTerm}
            pendingValidationFilter={pendingValidationFilter}
            isFilteringByPendingValidation={isFilteringByPendingValidation}
          />
          <ShowLocationModal
            showmodal={showShowModal}
            setShowModal={setShowShowModal}
            setShowEditModal={setShowEditModal}
            setShowDeleteModal={setShowDeleteModal}
            id={selectedId}
          />
          <EditLocationModal
            id={selectedId}
            showmodal={showEditModal}
            setShowModal={setShowEditModal}
            listRefetch={ListRefetch}
          />
          <AddLocationModal
            showmodal={showAddModal}
            setShowModal={setShowAddModal}
            listRefetch={ListRefetch}
          />
          <DeleteLocationModal
            id={selectedId}
            showmodal={showDeleteModal}
            setShowModal={setShowDeleteModal}
            listRefetch={ListRefetch}
          />
        </Styled.Content>
      </Styled.HeaderContentContainer>
    </Styled.Container>
  );
};

export default Locations;
