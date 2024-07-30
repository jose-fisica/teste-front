import { useEffect, useState } from "react"
import { api } from "../../../utils/axios"
import { BackgroundProjeto,DashboardContainer, Form, Button, AbortButton, TabPojetos,TabPojetosButotn } from "../StyledProjeto"
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


const ProsciProjetoFormPage = () => {
    const navigate = useNavigate();
    const { id } = useParams<RouteParams>();
    const [perguntasForm, setPerguntasForm] = useState<Categoria[]>([])
    const [tabState,setTabState] = useState<number>(1)

  const [form, setForm] = useState<any>({
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

  const onSubmit = async (event:any) => {
    event.preventDefault();
    try {
        const payload = {
          "form_data": form,
          "projeto_id":id,
          "perguntas": perguntasForm
        }
        const response = await api.post(`/projeto/projeto/update_or_create_prosci_projeto`, payload);
        navigate(`/projeto/${id}`)
    } catch (error) {
      toast.error('Você deve responder todas as peguntas para continuar.');
    }
  };

  const fetchFormProsciProjetoFormulario =  async () => {
    try {
        const response = await api.get('/projeto/prosci-projeto-formulario')
        setPerguntasForm(response?.data)

    } catch (error){
        console.error(error)
    }
  }

  const fetchFormProsciPrevState =  async () => {
    try {
        const response = await api.get(`/projeto/projeto/get_prosci_prevstate?projeto_id=${id}`)
        setForm(response.data?.prev_state)
    } catch (error){
        console.error(error)
    }
  }

  useEffect(() => {
    fetchFormProsciProjetoFormulario();
    fetchFormProsciPrevState();
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
                }>Características da Mudança</TabPojetosButotn>
                <TabPojetosButotn style={{
                    background: tabState==2?'#e2e7f1':'none',
                    border: tabState==2?'1px solid #001969':'none',
                }}
                onClick={()=>setTabState(2)
                }>Atributos Organizacionais</TabPojetosButotn>
                
            </TabPojetos>

            <Form action="" onSubmit={onSubmit} style={{background:'#e2e7f1'}}>
                {
                  (tabState && perguntasForm) && perguntasForm[tabState-1]?.perguntas.map(
                      (pergunta:Pergunta)=>(
                        <>
                        <div style={{width:'90%',marginTop:'10px'}}>{pergunta?.ordem})  {pergunta.descricao} <div style={{display:'flex', alignItems:'center'}}>
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

export default ProsciProjetoFormPage;


