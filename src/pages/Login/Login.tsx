import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { LoginResponse, doLogin } from '../../services/login/login-service';
import { useAuth } from '../../context/auth/AuthProvider';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReactComponent as BlindIcon } from '../../assets/Icons/Blindicons.svg';
import { ReactComponent as VisibilityIcon } from '../../assets/Icons/Visibilityicons.svg';
import * as Styled from './Login.styles';

const schema = z.object({
  username: z
    .string()
    .email({ message: 'Email inválido' })
    .min(1, { message: 'Preencha o email' }),
  password: z
    .string()
    .min(6, { message: 'A senha deve ter pelo menos 6 caracteres.' }),
});

type FormValues = z.infer<typeof schema>;

export const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const { setAccessToken, setRefreshToken, setPersist } = useAuth();

  const getLogin = async (formData: FormValues) => {
    const userData = {
      username: formData.username,
      password: formData.password,
    };

    try {
      const response: LoginResponse = await doLogin(userData);

      if (response.refresh_token) {
        setPersist(true);
        localStorage.setItem('persist', 'true');
        setAccessToken(response.token_jwt);
        setRefreshToken(response.refresh_token);
        navigate('/');
      } else {
        setLoginError('Usuário ou senha incorretos.');
      }
    } catch (error) {
      setLoginError('Erro ao efetuar login. Por favor, tente novamente.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <Styled.Container>
      <Styled.Content>
        <Styled.Form onSubmit={handleSubmit(getLogin)}>
          <Styled.Title>LOGIN</Styled.Title>

          <Styled.Input
            data-testid="email"
            type="text"
            {...register('username')}
            placeholder="Email"
            hasError={!!errors.username}
          />
          {errors.username && (
            <Styled.ErrorMsg>{errors.username.message}</Styled.ErrorMsg>
          )}

          <Styled.InputContainer>
            <Styled.Input
              data-testid="password"
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
              placeholder="Senha"
              hasError={!!errors.password}
            />
            <Styled.TogglePasswordIcon onClick={togglePasswordVisibility}>
              {showPassword ? <VisibilityIcon /> : <BlindIcon />}
            </Styled.TogglePasswordIcon>
          </Styled.InputContainer>
          {errors.password && (
            <Styled.ErrorMsg>{errors.password.message}</Styled.ErrorMsg>
          )}
          {loginError && <Styled.ErrorMsg>{loginError}</Styled.ErrorMsg>}

          <Styled.Label>Esqueceu sua senha?</Styled.Label>

          <Styled.Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Carregando...' : 'Entrar'}
          </Styled.Button>
        </Styled.Form>
      </Styled.Content>
    </Styled.Container>
  );
};
