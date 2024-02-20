import axios, { AxiosError } from 'axios';

export const validaCep = async (cep: string | null) => {
  const response = await axios
    .get(`https://viacep.com.br/ws/${cep}/json/`)
    .then((res) => (res.data.error ? false : true))
    .catch((err: AxiosError) => {
      return false;
    });

  return response;
};
