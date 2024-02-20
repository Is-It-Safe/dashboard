/* eslint-disable react/no-unescaped-entities */
import { Button } from '../../Button/Button';
import { Frame } from '../../../layout';
import { Modal } from '../Modal/Modal';
import { Title } from './DeleteLocationModal.styles';
import { useQuery } from 'react-query';
import { getLocationById } from '../../../services/location/location-by-id-service';
import { useAuth } from '../../../context/auth/AuthProvider';
import { deleteLocationById } from '../../../services/location/delete-by-id-service';
import { disableLocationById } from '../../../services/location/disable-by-id-service';
import Loading from '../../Loading/Loading';
type IDeleteLocationModal = {
  showmodal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
  listRefetch: () => void;
};

const DeleteLocationModal = ({
  showmodal,
  setShowModal,
  id,
  listRefetch,
}: IDeleteLocationModal) => {
  const { accessToken } = useAuth();
  const locationQuery = useQuery(
    ['location', id],
    () => getLocationById(accessToken, id),
    {
      enabled: !!id && showmodal,
    }
  );
  const handleDelete = async () => {
    await deleteLocationById(accessToken, id)
      .then(() => {
        listRefetch();
      })
      .catch((err) => {
        throw new Error(err.message);
      })
      .finally(() => {
        setShowModal(false);
      });
  };
  const handleDisable = async () => {
    await disableLocationById(accessToken, id)
      .then(() => {
        listRefetch();
      })
      .catch((err) => {
        throw new Error(err.message);
      })
      .finally(() => {
        setShowModal(false);
      });
    setShowModal(false);
  };
  if (locationQuery.isLoading) {
    return <div></div>;
  }
  return (
    <Modal showModal={showmodal} setShowModal={setShowModal}>
      {(locationQuery.data?.totalReviews as number) > 0 ? (
        <Frame direction="column" gap={'10px'}>
          <Title>Desativar Local</Title>
          <p>
            O local <b>'{locationQuery.data?.name}'</b> tem reviews. Locais com
            reviews não podem ser excluídos. Deseja desativar o local? Locais
            Desativados não são visíveis para os usuários.
          </p>
          <Frame direction="row" gap={'16px'}>
            <Button
              grow
              onClick={() => setShowModal(false)}
              data-testid="button-cancel"
            >
              CANCELAR
            </Button>
            <Button
              grow
              primary
              style={{ background: '#3d74ec' }}
              data-testid="button-send"
              onClick={() => handleDisable()}
            >
              DESATIVAR
            </Button>
          </Frame>
        </Frame>
      ) : (
        <Frame direction="column" gap={'30px'}>
          <Frame direction="column" gap={'10px'}>
            <Title>Excluir Local</Title>
            <p>
              Tem certeza de que deseja excluir o local{' '}
              <b>'{locationQuery.data?.name}'</b> permanentemente? Essa ação não
              poderá ser desfeita.
            </p>
          </Frame>
          <Frame direction="row" gap={'16px'}>
            <Button
              grow
              onClick={() => setShowModal(false)}
              data-testid="button-cancel"
            >
              CANCELAR
            </Button>
            <Button
              grow
              primary
              style={{ background: '#ec483d' }}
              data-testid="button-send"
              onClick={() => handleDelete()}
            >
              EXCLUIR
            </Button>
          </Frame>
        </Frame>
      )}
    </Modal>
  );
};

export { DeleteLocationModal };
