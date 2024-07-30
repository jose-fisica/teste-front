import { useEffect, useState } from "react"
import { api } from "../../../utils/axios"
import { BackgroundProjeto,DashboardContainer, Form, Button, AbortButton,TabPojetos,TabPojetosButotn } from "../../Projetos/StyledProjeto"
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

interface Categoria {
  id: number;
  descricao: string;
  ordem: number;
  perguntas: Pergunta[]
}

const SponsorPrimarioFormPage = () => {
    const navigate = useNavigate();
    const { id } = useParams<RouteParams>();
    const [perguntasForm, setPerguntasForm] = useState<Categoria[]>([])
    const [tabState,setTabState] = useState<number>(1)

  const [form, setForm] = useState<any>({
    'posicionamento':0,
    '1,1':0,
  });


  const handleChange = (type:number, pergunta: number, resposta: any) => {
    let nota = parseInt(resposta, 10);

    if(nota > 5){
      nota =5
    } else if (nota<1){
      nota = 1
    }
    
    resposta = nota.toString()
    setForm((prevState:any) => ({
      ...prevState,
      [`${type},${pergunta}`]:resposta
    }));
  };

  const handleChangePosicionamento = (resposta: any) => {
    setForm((prevState:any) => ({
      ...prevState,
      [`posicionamento`]:resposta
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
        const response = await api.post(`/projeto/projeto/update_or_create_sponsor_primario_projeto`, payload);
        navigate(`/projeto/${id}`)
    } catch (error) {
      toast.error('Você deve responder todas as peguntas para continuar.');
    }
  };

  const fetchFormProsciProjetoFormulario =  async () => {
    try {
        const response = await api.get('/projeto/prosci-sponsor-primario-formulario')
        setPerguntasForm(response?.data)

    } catch (error){
        console.error(error)
    }
  }

  const fetchFormSponsorPrimarioPrevState =  async () => {
    try {
        const response = await api.get(`/projeto/projeto/get_sponsor_primario_prevstate?projeto_id=${id}`)
        setForm(response.data?.prev_state)
    } catch (error){
        console.error(error)
    }
  }
  useEffect(() => {
    fetchFormSponsorPrimarioPrevState();
    fetchFormProsciProjetoFormulario();
  }, [])

  return (
    <BackgroundProjeto>
      <ToastContainer/>
        <DashboardContainer>
            <TabPojetos>
                <TabPojetosButotn style={{
                    background: tabState==1?'#e2e7f1':'none',
                    border: tabState==1?'1px solid #001969':'none',
                }}
                onClick={()=>setTabState(1)
                }>Participação no projeto</TabPojetosButotn>
                <TabPojetosButotn style={{
                    background: tabState==2?'#e2e7f1':'none',
                    border: tabState==2?'1px solid #001969':'none',
                }}
                onClick={()=>setTabState(2)
                }>Coalizão de Patrocínios</TabPojetosButotn>
                <TabPojetosButotn style={{
                    background: tabState==3?'#e2e7f1':'none',
                    border: tabState==3?'1px solid #001969':'none',
                }}
                onClick={()=>setTabState(3)
                }>Participação no projeto</TabPojetosButotn>
                <TabPojetosButotn style={{
                    background: tabState==4?'#e2e7f1':'none',
                    border: tabState==4?'1px solid #001969':'none',
                }}
                onClick={()=>setTabState(4)
                }>Posicionamento no projeto</TabPojetosButotn>
            </TabPojetos>

            <Form action="" onSubmit={onSubmit} style={{background:'#e2e7f1', minHeight:'508px'}}>
              <div style={{width:'100%'}}>
                {
                  (tabState && perguntasForm) && (tabState!=4) ? perguntasForm[tabState-1]?.perguntas.map(
                      (pergunta:Pergunta)=>(
                        <>
                        <div style={{width:'90%'}}>{pergunta?.ordem})  {pergunta.descricao} <div style={{display:'flex', alignItems:'center'}}>
                              <input 
                                id={`${pergunta.id}-${tabState}`} 
                                style={{marginRight:'5px',width:'20%'}}
                                min="1"
                                max="5"
                                value={form[`${tabState},${pergunta.id}`]?form[`${tabState},${pergunta.id}`]:0}
                                onChange = {(e)=>handleChange(tabState,pergunta.id,e?.target?.value)}
                                type="number">
                              </input> 
                            </div> </div>

                        </>
                      )
                  ):
                  <>
                  <div style={{display:'flex', alignItems:'center',justifyContent:'center'}}>
                    <div>
                    <input 
                    id={`apoiador`} 
                    style={{marginRight:'5px'}}
                    checked = {form[`posicionamento`] == 1}
                    onChange = {()=>handleChangePosicionamento(1)}
                    type="checkbox"
                    >
                    </input>
                     <span>Apoiador</span> 
                    </div>
                    <div style={{marginLeft:'1rem'}}>
                    <input 
                    id={`contra`} 
                    checked = {form[`posicionamento`] == 0}
                    onChange = {()=>handleChangePosicionamento(0)}
                    type="checkbox">
                    </input> <span>Contra</span>
                    </div>
                    </div>
                    
                  </>
                }
                </div>
            </Form>
            <div style={{height:'50px',width:'100%', display:'flex',justifyContent:'space-around', alignItems:'center'}}>
            <AbortButton onClick={()=>navigate(`/projeto/${id}`)}>Cancelar</AbortButton>
            <Button onClick={onSubmit}>Gerar Analise</Button>
            </div>
        </DashboardContainer>
    </BackgroundProjeto>
    
  )
}

export default SponsorPrimarioFormPage;


