import { useEffect, useState } from "react"
import { api } from "../../../utils/axios"
import { BackgroundProjeto,DashboardContainer, Form, Button, AbortButton,TabPojetos,TabPojetosButotn } from "../../Projetos/StyledProjeto"
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


interface RouteParams extends Record<string, string> {
    id: string;
  }

interface Pergunta {
  id: number;
  value: string;
  groupId: number;
  type:string;
}


const CoalizaoPatrocinioFormPage = () => {
    const navigate = useNavigate();
    const { id } = useParams<RouteParams>();

  const [questions, setQuestions] = useState<Pergunta[]>([
    { id: 1, value: '', groupId: 1, type: 'nm_grupo' },
    { id: 2, value: '', groupId: 1 ,type: 'n_sponsor'},
    { id: 3, value: '', groupId: 1 ,type: 'c_sponsor'},
    { id: 4, value: '', groupId: 1 ,type: 'posicionamento'},
    { id: 5, value: '', groupId: 1 ,type: 'nota'},
  ]);

  const [groupIdCounter, setGroupIdCounter] = useState<number>(1);

  const groupedQuestions = questions.reduce<{ [key: number]: Pergunta[] }>((acc, question) => {
    if (!acc[question.groupId]) {
      acc[question.groupId] = [];
    }
    acc[question.groupId].push(question);
    return acc;
  }, {});

  const handleChange = (id: number, value: string, type:string) => {
    if(type=='nota'){
        let nota = parseInt(value, 10);
        if (nota < 0) {
            nota = 0;
          } else if (nota > 3) {
            nota = 3;
          } 
          value = nota.toString()
          setQuestions((prevQuestions) =>
        prevQuestions.map((question) =>
        question.id === id ? { ...question, value } : question
      )
    );
    } else if(type=='posicionamento') {
        if(value=='A' || value=='B' ||value=='a' ||value=='b' || value==''){
            setQuestions((prevQuestions) =>
                prevQuestions.map((question) =>
                question.id === id ? { ...question, value } : question
            )
    );
        }
    } else {
        setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === id ? { ...question, value } : question
      )
    );
    }
    
  };


  const addQuestions = () => {
    const newGroupId = groupIdCounter + 1;
    const newQuestions = [
      { id: questions.length + 1, value: '', groupId: newGroupId,type: 'nm_grupo' },
      { id: questions.length + 2, value: '', groupId: newGroupId,type: 'n_sponsor' },
      { id: questions.length + 3, value: '', groupId: newGroupId,type: 'c_sponsor' },
      { id: questions.length + 4, value: '', groupId: newGroupId,type: 'posicionamento' },
      { id: questions.length + 5, value: '', groupId: newGroupId,type: 'nota' },
    ];
    setQuestions((prevQuestions) => [...prevQuestions, ...newQuestions]);
    setGroupIdCounter(newGroupId);
  };

  const onSubmit = async (event:any) => {
    event.preventDefault();
    try {
        const payload = {
          "form_data": questions,
          "projeto_id":id,
        }
        const response = await api.post(`/projeto/projeto/update_or_create_colalizao_patrocinio`, payload);
        navigate(`/projeto/${id}`)
    } catch (error) {
      toast.error('Você deve responder todas as peguntas corretamente para continuar.');
    }
  };
  
  const fetchPrevState = async () => {
    try {
        const response = await api.get(`/projeto/projeto/get_coalizao_patrocinio_prevstate?projeto_id=${id}`);
        const list: Pergunta[] = response?.data?.prev_state || [];
        if (list.length>0){
            setQuestions(list)
            setGroupIdCounter(response?.data?.prev_state[-1]?.value)
        }
    } catch (error) {
        console.error(error)
    }
  };

  useEffect(() => {
    fetchPrevState();
  }, [])

  return (
    <BackgroundProjeto>
        <ToastContainer />
        <DashboardContainer>
            <TabPojetos >
                <TabPojetosButotn>Participação no projeto</TabPojetosButotn>
            </TabPojetos>

            <Form action="" onSubmit={onSubmit} style={{background:'#e2e7f1', minHeight:'508px',overflowX:'scroll'}} className="form-grid">
                <TabPojetos style={{justifyContent:'space-around',margin:'0px'}}>
                    <TabPojetosButotn style={{marginLeft:'0px'}}>Nome do Grupo</TabPojetosButotn>
                    <TabPojetosButotn style={{marginLeft:'0px'}}>Iniciais do Sponsor</TabPojetosButotn>
                    <TabPojetosButotn style={{marginLeft:'0px'}}>Cargo do Sponsor</TabPojetosButotn>
                    <TabPojetosButotn style={{marginLeft:'0px'}}>Posição (A ou B)</TabPojetosButotn>
                    <TabPojetosButotn style={{marginLeft:'0px'}}>Número (1 a 3)</TabPojetosButotn>
                </TabPojetos>
                    {Object.values(groupedQuestions).map((group, index) => (
                    <div key={index} style={{display:'flex', justifyContent:'space-around'}}>
                        {group.map((question) => (
                        question.type=='nota' ?
                        <div key={question.id}>
                            <input
                            id={`question-${question.id}`}
                            type="number"
                            min={0}
                            max={3}
                            value={question.value}
                            onChange={(e) => handleChange(question.id, e.target.value,question.type)}
                            required
                            />
                        </div>:
                        <div key={question.id}>
                            <input
                            id={`question-${question.id}`}
                            type="text"
                            value={question.value}
                            onChange={(e) => handleChange(question.id, e.target.value, question.type)}
                            required
                            />
                        </div>
                    
                        
                        ))}
                    </div>
                    ))}
                    
            </Form>
            <div style={{height:'50px',width:'100%', display:'flex',justifyContent:'space-around', alignItems:'center'}}>
            <AbortButton onClick={()=>navigate(`/projeto/${id}`)}>Cancelar</AbortButton>
            <Button onClick={addQuestions}>
                    Adicionar outro grupo
            </Button>
            <Button onClick={onSubmit}>Gerar Analise</Button>
            </div>
        </DashboardContainer>
    </BackgroundProjeto>
    
  )
}

export default CoalizaoPatrocinioFormPage;