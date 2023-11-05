import { Controller, useForm, FieldError } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  AddLocationFormSchemaType,
  addLocationFormSchema,
} from '../../../zodSchemas/AddLocationSchema';
import { ReactComponent as CloseIcon } from '../../../assets/Icons/Closeicons.svg';
import ModalImg from '../../ModalImg/ModalImg';
import { Button } from '../../Button/Button';
import { Input } from '../../Input/Input';
import { Form } from '../../Form/Form';
import { Frame } from '../../../layout';
import { Modal } from '../Modal/Modal';
import { Option, SelectComponent } from '../../Select/Select';
import { ConfirmationModal } from './../ConfirmationModal/ConfirmationModal';
import { Title, TitleContainer } from './AddLocationModal.styles';
import { useAuth } from '../../../context/auth/AuthProvider';
import { saveLocation } from '../../../services/location/save-location-service';
import { useQuery } from 'react-query';
import { translateCep } from '../../../services/cep/cep-translation-service';

type IAddLocationModal = {
  showmodal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddLocationModal = ({ showmodal, setShowModal }: IAddLocationModal) => {
  const { accessToken } = useAuth();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [typeNumber, setTypeNumber] = useState<string>('');
  const [hasError, setHasError] = useState<boolean>(false);
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);
  const [city, setCity] = useState<string>('');
  const [state, setState] = useState<string>('');
  const handleFileChange = (file: File | null) => {
    setSelectedFile(file);
  };

  const clearHide = () => {
    reset(), setShowModal(false);
  };

  const {   
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    clearErrors,
    reset,
    control,
    formState: { errors },
  } = useForm<AddLocationFormSchemaType>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: zodResolver(addLocationFormSchema),
  });

  const cepValue = watch('cep')?.replace(/\D/g, '');

  // Define the query inside your component
  useQuery(['translatedCep', cepValue], () => translateCep(cepValue), {
    enabled: cepValue?.length === 8 && !errors.cep,
    retry: false,
    onSuccess: (data) => {
      setCity(data.localidade);
      setState(data.uf);
      clearErrors('cep');
    },
    onError: () => {
      if (!errors.cep) {
        setError('cep', { type: 'manual', message: 'CEP Inválido' });
      }
    },
  });

  const onSubmit = (data: AddLocationFormSchemaType) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('locationTypeId', typeNumber);
    formData.append('file', selectedFile as File);
    formData.append('cep', data.cep);
    const save = saveLocation(accessToken, formData);
    save
      .then(() => {
        setHasError(false);
        setShowSubmitModal(true);
      })
      .catch(() => {
        setHasError(true);
        setShowSubmitModal(true);
      });
    setTimeout(() => {
      setShowSubmitModal(false);
      setShowModal(false);
    }, 2000);
    clearHide();
  };

  const types: Option[] = [
    { value: '1', label: 'Bar' },
    { value: '2', label: 'Restaurante' },
    { value: '3', label: 'Casa Noturna' },
  ];

  return (
    <Modal
      header={
        <>
          <TitleContainer>
            <Title>Novo Local</Title>
          </TitleContainer>
          <CloseIcon
            data-testid="close-modal"
            onClick={() => clearHide()}
          ></CloseIcon>
        </>
      }
      showModal={showmodal}
      setShowModal={setShowModal}
    >
      <ConfirmationModal
        hasError={hasError}
        setShowModal={setShowSubmitModal}
        showmodal={showSubmitModal}
      />
      <Form handleSubmit={handleSubmit} onSubmit={(data) => onSubmit(data)}>
        <Frame direction="column" gap={'16px'} style={{ width: '100%' }}>
          <Input
            label="Nome"
            {...register('name', {})}
            data-testid="input-name"
            error={errors.name as FieldError}
          />
          <Controller
            control={control}
            render={() => (
              <SelectComponent
                label="Tipo"
                options={types}
                onChange={(value) => {
                  setValue('type', value.value);
                  setTypeNumber(value.value);
                  errors.type = undefined;
                }}
                dataTestid="type-select"
                error={errors.type}
              />
            )}
            name="type"
          ></Controller>
          <Frame direction="row" gap="10px">
            <Input
              label="CEP"
              {...register('cep')}
              data-testid="input-cep"
              error={errors.cep}
              style={{ width: '100px', boxSizing: 'border-box' }}
            />
            <Input label="Cidade" value={city} readOnly data-testid="city" />
            <Input
              label="UF"
              value={state}
              readOnly
              data-testid="state"
              style={{ width: '100%' }}
            />
          </Frame>
          <Frame data-testid="img" direction="row" gap={'0px'}>
            <ModalImg src="" onFileChange={handleFileChange} />
          </Frame>
          <Frame direction="row" gap={'18px'}>
            <Button
              grow
              onClick={() => clearHide()}
              data-testid="button-cancel"
            >
              CANCELAR
            </Button>
            <Button grow type="submit" primary data-testid="button-send">
              ENVIAR
            </Button>
          </Frame>
        </Frame>
      </Form>
    </Modal>
  );
};

export { AddLocationModal };
