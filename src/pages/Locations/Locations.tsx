import Sidebar from '../../components/sidebar/Sidebar';
import Header from '../../components/header/Header';
import * as Styled from './Locations.styles';
import { ShowLocationModal } from '../../components/Modals/ShowLocationModal/ShowLocationModal';
import { EditLocationModal } from '../../components/Modals/EditLocationModal/EditLocationModal';
import { AddLocationModal } from '../../components/Modals/AddLocationModal/AddLocationModal';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useAuth } from '../../context/auth/AuthProvider';
import { DeleteLocationModal } from '../../components/Modals/DeleteLocationModal/DeleteLocationModal';
import { ListLocation } from './components/ListLocation/ListLocation';
import {
  LocationList,
  getAllLocations,
} from '../..../../../services/location/all-location-service';
import { SearchList } from './components/SearchList/SearchList';

const Locations = () => {
  const [showShowModal, setShowShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showdeleteModal, setShowdeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedId, setSelectedId] = useState<number>(0);
  const { accessToken } = useAuth();
  const locationList = useQuery<LocationList>('locationList', () =>
    getAllLocations(accessToken)
  );

  useEffect(() => {
    if (!showShowModal && !showEditModal && !showdeleteModal && !showAddModal)
      locationList.refetch();
  }, [showShowModal, showEditModal, showdeleteModal, showAddModal]);

  return (
    <Styled.Container>
      <Sidebar></Sidebar>
      <Styled.HeaderContentContainer>
        <Header />
        <Styled.Content>
          <ListLocation
            setShowShowModal={setShowShowModal}
            setShowEditModal={setShowEditModal}
            setShowDeleteModal={setShowdeleteModal}
            setSelectedId={setSelectedId}
            locationList={locationList}
          />
          <ShowLocationModal
            showmodal={showShowModal}
            setShowModal={setShowShowModal}
            setShowEditModal={setShowEditModal}
            setShowDeleteModal={setShowdeleteModal}
            id={selectedId}
          />
          <EditLocationModal
            id={selectedId}
            showmodal={showEditModal}
            setShowModal={setShowEditModal}
          />
          <AddLocationModal
            showmodal={showAddModal}
            setShowModal={setShowAddModal}
          />
          <DeleteLocationModal
            showmodal={showdeleteModal}
            setShowModal={setShowdeleteModal}
            locationName={
              locationList.data?.content?.find(
                (location) => location.id === selectedId
              )?.name as string
            }
            id={selectedId}
          />
        </Styled.Content>
      </Styled.HeaderContentContainer>
    </Styled.Container>
  );
};

export default Locations;
