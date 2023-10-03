import { z } from 'zod';
import { validaCep } from '../services/cep/cep-validation-service';

export const editLocationFormSchema = z.object({
  name: z.string().min(5, 'Campo obrigatório').max(100),
  endereco: z.string().min(5, 'Campo obrigatório').max(100),
  type: z
    .string()
    .nonempty({ message: 'Campo obrigatório' })
    .refine(
      (value) => {
        if (value === '1' || value === '2' || value === '3') {
          return true;
        } else {
          return false;
        }
      },
      { message: 'Selecione uma opção' }
    ),
  cep: z.string().refine((cep) => validaCep(cep), {
    message: 'CEP Inválido',
  }),
  latitude: z
    .string()
    .pipe(
      z.coerce
        .number()
        .min(-90, { message: 'Latitude inválida' })
        .max(90, { message: 'Latitude inválida' })
    )
    .pipe(z.coerce.string()),
  longitude: z
    .string()
    .pipe(
      z.coerce
        .number()
        .min(-180, { message: 'Longitude inválida' })
        .max(180, { message: 'Longitude inválida' })
    )
    .pipe(z.coerce.string()),
});
