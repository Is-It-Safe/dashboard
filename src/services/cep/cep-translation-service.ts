import axios, { AxiosError } from 'axios';

export type TranslatedCep = {
  bairro: string;
  cep: string;
  complemento: string;
  ddd: string;
  gia: string;
  ibge: string;
  localidade: string;
  logradouro: string;
  siafi: string;
  uf: string;
};

export const translateCep = async (cep: string | undefined) => {
  const response: TranslatedCep = await axios
    .get(`https://viacep.com.br/ws/${cep}/json/`)
    .then((res) => res.data)
    .catch((err: AxiosError) => {
      throw new Error(err.message);
    });

  return response;
};
