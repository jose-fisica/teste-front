import { useState } from "react"
import { api } from "../../utils/axios"
import { BackgroundProjeto,DashboardContainer, Form, Button, AbortButton,FormInputTitle,TabPojetos,TabPojetosButotn } from "../Projetos/StyledProjeto"
import { toast } from 'react-toastify'
import { useNavigate } from "react-router-dom";


interface FormProjeto {
  descricao: string;
}

const CreateProjetoPage = () => {
    const navigate = useNavigate();
  const [form, setForm] = useState<FormProjeto>({
    'descricao':'',
  });


  const handleChange = (key:string,value:string) => {
    setForm((prevState:any) => ({
      ...prevState,
      [key]:value
    }));
  };

  const onSubmit = async (event:any) => {
    event.preventDefault();
    try {
        const payload = {
          "descricao": form.descricao,
        }
        const response = await api.post(`/projeto/projeto/create_projeto`, payload);
        navigate(`/projeto/${response?.data?.id}`)
    } catch (error) {
      toast.error('Você deve responder todas as peguntas para continuar.');
    }
  };


  return (
    <BackgroundProjeto>
        <DashboardContainer>
        <TabPojetos >
                <TabPojetosButotn >Defina um título para a sua mudança</TabPojetosButotn>
            </TabPojetos>
            <Form action="" onSubmit={onSubmit} style={{marginTop:'10px',height:'500px'}}>
                <FormInputTitle onChange={(e)=>handleChange('descricao',e?.target?.value)}></FormInputTitle>
            </Form>
            <div style={{height:'50px',width:'100%', display:'flex',justifyContent:'space-around', alignItems:'center'}}>
            <AbortButton onClick={()=>navigate('/home')}>Cancelar</AbortButton>
            <Button onClick={onSubmit}>Criar Projeto</Button>
            </div>
        </DashboardContainer>
    </BackgroundProjeto>
    
  )
}

export default CreateProjetoPage;


