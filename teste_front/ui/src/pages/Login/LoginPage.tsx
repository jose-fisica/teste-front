import { useEffect, useState } from "react"
import { LoginPageProps, TFormLogin } from "../../types/Login/LoginTypes"
import {TErros} from '../../types/ErrosRequired/ErrosRequired'
import { useNavigate } from "react-router-dom";
import { api } from "../../utils/axios"
import { Background, Form,Input,Button } from "./StyledLogin";
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = ({ className }: LoginPageProps) => {
  const navigate = useNavigate();
  const [form, setForm] = useState<TFormLogin>({
    user: '',
    password: '',
  })
  const [erros, setErros] = useState<TErros>({
    invalid: '',
    userRequired: '',
    passRequired: ''
  })

  const handleChange = (name: "user" | "password", value: string) => {
    setForm((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const validateErros = (): boolean => {
    const errors: Partial<TErros> = {};

    if (!form.user) {
      errors.userRequired = 'Campo obrigatório';
    } else {
      errors.userRequired = '';
    }

    if (!form.password) {
      errors.passRequired = 'Campo obrigatório';
    } else {
      errors.passRequired = '';
    }

    setErros((prevState) => ({
      ...prevState,
      ...errors
    }));

    return !errors.userRequired && !errors.passRequired;
  }


  const onSubmit = async (event:any) => {
    event.preventDefault();
    try {
      if(validateErros()){
        const payload = {
          "password": form.password,
          "username": form.user
        }
        const response = await api.post(`/pessoa/login`, payload);
        console.log('response',response.data.token)
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        navigate("/home")
      }
    } catch (error) {
      console.error(error);
      setErros((prevState) => ({
        ...prevState,
        invalid: 'Login ou senha incorretos'
      }));
    }
  };

  const getRequired = (type:string) => {
    if(type==='user'){
      if(erros.invalid || erros.userRequired){
        return true
      }
      else{
        return false
      }
    }
    else{
      if(erros.invalid || erros.passRequired){
        return true
      }
      else{
        return false
      }
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        onSubmit(e);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [form]);

  return (
    <Background>
      <Form action="" onSubmit={onSubmit}>
          <Input type="text" placeholder="Usuário/E-mail"
            style={{marginTop:'1rem',height:'30px'}}
            required={getRequired('user')}
            onChange={(e:any) => {
              handleChange('user', e.target.value)
            }}
          />
          <Input type="password" placeholder="Código de acesso"
            style={{marginTop:'1rem',marginBottom:'1rem',height:'30px'}}
            required={getRequired('pass')}
            onChange={(e:any) => {
              handleChange('password', e.target.value)
            }}
          />
        <Button onClick={(e) => { onSubmit(e) }}>ACESSAR</Button>
      </Form>
    </Background>
  )
}

export default LoginPage;
