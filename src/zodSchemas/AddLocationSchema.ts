import { z } from 'zod';
import { validaCep } from '../services/cep/cep-validation-service';

export const addLocationFormSchema = z.object({
  name: z.string().min(5, 'Campo obrigatório').max(100),
  type: z
    .string()
    .min(1, { message: 'Campo obrigatório' })
    .refine((value) => ['1', '2', '3'].includes(value), {
      message: 'Selecione uma opção',
    }),
  cep: z.string().refine((cep) => validaCep(cep), {
    message: 'CEP Inválido',
  }),
  endereco: z.string().min(5, 'Campo obrigatório').max(100),
});

export type AddLocationFormSchemaType = z.infer<typeof addLocationFormSchema>;
