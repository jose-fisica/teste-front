import { useEffect, useState } from "react"
import { api } from "../../utils/axios"
import { useNavigate } from "react-router-dom";
import { 
    BackgroundHome,
    FilterCreate,
    DashboardContainer,
    CardContainer,
    Button,
    Input 
    } from "./StyledHome";
import CardProjeto from "../../components/CardProjeto";
import { Projeto } from "../../types/Projetos/ProjetosTypes"

const HomePage = () => {
const navigate = useNavigate();
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [search, setSearch] = useState<string>('');

  const getProjetos = async () => {
    try {
      const response = await api.get(`/projeto/projeto?descricao=${search}`)
      setProjetos(response?.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getProjetos()
  }, [search])

  return (
    <BackgroundHome>
        <DashboardContainer>
        <FilterCreate>
          <div style={{width:'85%',display:'flex',justifyContent:'center'}}>
            <Input type="text" placeholder="Busque pelo nome do projeto"
            onChange={(e:any) => {
              setSearch(e.target.value)
            }}
          />
          </div>
          <Button style={{padding:'5px'}} onClick={() => navigate('/new')}> Criar novo Projeto </Button>
        </FilterCreate>
        <CardContainer>
            {
                projetos && projetos.map(
                    (projeto:Projeto) => (
                            <CardProjeto projeto={projeto}/>
                    )
                )
            }
        </CardContainer>
        </DashboardContainer>
    </BackgroundHome>
    
  )
}

export default HomePage;
