import { useEffect, useState } from "react"
import { api } from "../../../utils/axios"
import { BackgroundProjeto,DashboardContainer, Form, Button, AbortButton,TabPojetos,TabPojetosButotn } from "../../Projetos/StyledProjeto"
import { useTranslation } from "react-i18next"
import { useNavigate, useParams } from "react-router-dom";
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface RouteParams extends Record<string, string> {
    id: string;
  }

interface Pergunta {
  id: number;
  descricao: string;
  ordem: number;
}

interface Resposta {
  id: number;
  descricao: string;
  codigo: number;
}

interface Categoria {
  id: number;
  descricao: string;
  ordem: number;
  perguntas: Pergunta[]
}



const SaudeProjetoFormPage = () => {
    const navigate = useNavigate();
    const { id } = useParams<RouteParams>();
    const [perguntasForm, setPerguntasForm] = useState<Categoria[]>([])
    const [respostasPossiveisForm, setRespostasPossiveisForm] = useState([])
    const [tabState,setTabState] = useState<number>(1)
    const { t } = useTranslation();

  const [form, setForm] = useState<any>({
    '1,1':0,
  });


  const handleChange = (type:number, pergunta: number, resposta: number) => {
    setForm((prevState:any) => ({
      ...prevState,
      [`${type},${pergunta}`]:resposta
    }));
  };

  const onSubmit = async (event:any) => {
    event.preventDefault();
    try {
        const payload = {
          "form_data": form,
          "projeto_id":id,
          "perguntas": perguntasForm
        }
        const response = await api.post(`/projeto/projeto/update_or_create_saude_projeto`, payload);
        navigate(`/projeto/${id}`)
    } catch (error) {
      toast.error('Você deve responder todas as peguntas para continuar.');
    }
  };

  const fetchFormSaudeProjetoFormulario =  async () => {
    try {
        const response = await api.get('/projeto/saude-projeto-formulario')
        setPerguntasForm(response?.data)

    } catch (error){
        console.error(error)
    }
  }
  const fetchFormSaudeProjetoRespostasPossiveisFormulario =  async () => {
    try {
        const response = await api.get('/projeto/saude-projeto-respostas-possiveis')
        setRespostasPossiveisForm(response?.data)
    } catch (error){
        console.error(error)
    }
  }
  const fetchFormSaudeProjetorevState =  async () => {
    try {
        const response = await api.get(`/projeto/projeto/get_saude_projeto_prevstate?projeto_id=${id}`)
        setForm(response.data?.prev_state)
        console.log(response.data?.prev_state)
    } catch (error){
        console.error(error)
    }
  }

  useEffect(() => {
    fetchFormSaudeProjetorevState();
    fetchFormSaudeProjetoFormulario();
    fetchFormSaudeProjetoRespostasPossiveisFormulario();
  }, [])

  return (
    <BackgroundProjeto>
      <ToastContainer/>
        <DashboardContainer>
            <TabPojetos >
                <TabPojetosButotn style={{
                    background: tabState==1?'#e2e7f1':'none',
                    border: tabState==1?'1px solid #001969':'none',
                }}
                onClick={()=>setTabState(1)
                }>Liderança / Patrocínio</TabPojetosButotn>
                <TabPojetosButotn style={{
                    background: tabState==2?'#e2e7f1':'none',
                    border: tabState==2?'1px solid #001969':'none',
                }}
                onClick={()=>setTabState(2)
                }>Gestão de Projetos</TabPojetosButotn>
                <TabPojetosButotn style={{
                    background: tabState==3?'#e2e7f1':'none',
                    border: tabState==3?'1px solid #001969':'none',
                }}
                onClick={()=>setTabState(3)
                }>Gestão de Mudanças</TabPojetosButotn>
            </TabPojetos>

            <Form action="" onSubmit={onSubmit} style={{background:'#e2e7f1'}}>
                {
                  (tabState && perguntasForm) && perguntasForm[tabState-1]?.perguntas.map(
                      (pergunta:Pergunta)=>(
                        <>
                        <div style={{width:'90%',marginTop:'10px'}}>{pergunta?.ordem})  {pergunta.descricao}  </div>
                        <div style={{margin:'5px',display:'flex',width:'100%',justifyContent:'space-around'}}>
                        {respostasPossiveisForm&&respostasPossiveisForm.map(
                          (resposta:Resposta) => (
                            <div style={{display:'flex', alignItems:'center'}}>
                              <input 
                                id={`${pergunta.ordem}-${tabState}`} 
                                style={{marginRight:'5px'}}
                                checked = {form[`${tabState},${pergunta.id}`] == resposta.id}
                                onChange = {()=>handleChange(tabState,pergunta.id,resposta.id)}
                                type="checkbox">
                              </input> {resposta?.descricao}
                            </div>
                          )
                        )}
                        </div>
                        </>
                      )
                  )
                }
            </Form>
            <div style={{height:'50px',width:'100%', display:'flex',justifyContent:'space-around', alignItems:'center'}}>
            <AbortButton onClick={()=>navigate(`/projeto/${id}`)}>Cancelar</AbortButton>
            <Button onClick={onSubmit}>Gerar Analise</Button>
            </div>
        </DashboardContainer>
    </BackgroundProjeto>
    
  )
}

export default SaudeProjetoFormPage;


