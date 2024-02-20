import React from 'react';
import { ReactComponent as CloseIcon } from '../../../assets/Icons/Closeicons.svg';
import { ReactComponent as EditIcon } from '../../../assets/Icons/Editicons.svg';
import { ReactComponent as BinIcon } from '../../../assets/Icons/Bin.svg';
import { Frame } from '../../../layout';
import { Modal } from '../Modal/Modal';
import * as Styles from './ShowLocationModal.styles';
import { useAuth } from '../../../context/auth/AuthProvider';
import { getLocationById } from '../../../services/location/location-by-id-service';
import { useQuery } from 'react-query';
import { translateCep } from '../../../services/cep/cep-translation-service';
import Loading from '../../Loading/Loading';

type IShowLocationModal = {
  showmodal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  id: number | undefined;
};

const ShowLocationModal = ({
  showmodal,
  setShowModal,
  setShowEditModal,
  setShowDeleteModal,
  id,
}: IShowLocationModal) => {
  const { accessToken } = useAuth();

  const locationQuery = useQuery(
    ['location', id],
    () => getLocationById(accessToken, id),
    {
      enabled: !!id && showmodal,
    }
  );

  const translatedCepQuery = useQuery(
    ['translatedCep', locationQuery.data?.cep],
    () => {
      if (locationQuery.data?.cep) {
        return translateCep(locationQuery.data.cep);
      }
    },
    {
      enabled: !!locationQuery.data?.cep && showmodal,
    }
  );

  const handleEdit = () => {
    setShowModal(false);
    setShowEditModal(true);
  };

  const handleDelete = () => {
    setShowModal(false);
    setShowDeleteModal(true);
  };

  if (locationQuery.isLoading || translatedCepQuery.isLoading) {
    return (
      <Styles.LoadingContainer>
        <Loading />
      </Styles.LoadingContainer>
    );
  }

  if (locationQuery.isError || translatedCepQuery.isError) {
    return <div>Error loading data...</div>;
  }

  const locationData = locationQuery.data;
  const cepData = translatedCepQuery.data;
  const src = locationData?.imgUrl || '';

  return (
    <Modal
      header={
        <Frame direction="column" gap={'0px'} style={{ width: '100%' }}>
          <Frame
            direction="row"
            gap={'0px'}
            style={{ justifyContent: 'space-between', alignItems: 'center' }}
          >
            <Styles.Id>{'#' + locationData?.id}</Styles.Id>
            <CloseIcon
              data-testid="close-modal"
              onClick={() => setShowModal(false)}
            />
          </Frame>
          <Styles.TitleContainer>
            <Styles.Title>{locationData?.name}</Styles.Title>
            <Styles.EditDelete>
              <BinIcon onClick={handleDelete} />
              <EditIcon onClick={handleEdit} />
            </Styles.EditDelete>
          </Styles.TitleContainer>
          <Frame direction="row" gap={'18px'} style={{ paddingTop: '3px' }}>
            <Styles.TextUnderTitle>
              {locationData?.averageGrade + ' Nota Média'}
            </Styles.TextUnderTitle>
            <Styles.TextUnderTitle>
              {locationData?.totalReviews + ' Avaliações'}
            </Styles.TextUnderTitle>
          </Frame>
          <Frame direction="row" gap={'18px'} style={{ paddingTop: '20px' }}>
            <Styles.StatusContainer>
              <span>
                {locationData?.pendingValidation ? 'Pendente' : 'Aprovado'}
              </span>
              <Styles.LocationStatusIcon
                approved={!locationData?.pendingValidation}
              />
            </Styles.StatusContainer>
            <Styles.StatusContainer>
              <span>Visível</span>
              <Styles.LocationStatusIcon approved={!!locationData?.isActive} />
            </Styles.StatusContainer>
          </Frame>
        </Frame>
      }
      showModal={showmodal}
      setShowModal={setShowModal}
    >
      <Frame direction="column" gap={'16px'}>
        <Frame direction="row" gap={'18px'}>
          <Styles.Property>
            <Styles.PropertyName>Tipo de local</Styles.PropertyName>
            <Styles.PropertyValue style={{ minWidth: '100%' }}>
              {locationData?.type}
            </Styles.PropertyValue>
          </Styles.Property>
        </Frame>
        <Frame direction="row" gap={'15%'}>
          <Styles.Property>
            <Styles.PropertyName>CEP</Styles.PropertyName>
            <Styles.PropertyValue>{locationData?.cep}</Styles.PropertyValue>
          </Styles.Property>
          <Styles.Property>
            <Styles.PropertyName>Cidade/UF</Styles.PropertyName>
            <Styles.PropertyValue>
              {cepData?.localidade + '/' + cepData?.uf}
            </Styles.PropertyValue>
          </Styles.Property>
        </Frame>
        <Frame direction="row" gap={'0'}>
          <Styles.Property style={{ width: '100%' }}>
            <Styles.PropertyName style={{ minWidth: '17.5%' }}>
              Endereço
            </Styles.PropertyName>
            <Styles.PropertyValue
              style={{
                overflow: 'hidden',
                minWidth: '60%',
              }}
            >
              {locationData?.endereco}
            </Styles.PropertyValue>
          </Styles.Property>
        </Frame>
        <Frame direction="row" gap={'15%'}>
          <Styles.Property>
            <Styles.PropertyName style={{ minWidth: '35%' }}>
              Latitude
            </Styles.PropertyName>
            <Styles.PropertyValue>
              {locationData?.latitude}
            </Styles.PropertyValue>
          </Styles.Property>
          <Styles.Property>
            <Styles.PropertyName style={{ minWidth: '40%' }}>
              Longitude
            </Styles.PropertyName>
            <Styles.PropertyValue>
              {locationData?.longitude}
            </Styles.PropertyValue>
          </Styles.Property>
        </Frame>
        <Frame direction="column" gap={'0'}>
          {src ? (
            <img
              style={{ width: '100%', height: 'auto', padding: '0' }}
              src={src}
              alt="Location"
            />
          ) : (
            <div></div>
          )}
        </Frame>
      </Frame>
    </Modal>
  );
};

export { ShowLocationModal };
