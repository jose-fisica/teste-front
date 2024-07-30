import { useEffect, useState } from "react"
import { api } from "../../utils/axios"
import { BackgroundProjeto,DashboardContainer, AbortButton,TabPojetos,TabPojetosButotn } from "../Projetos/StyledProjeto"
import { useNavigate, useParams } from "react-router-dom";
import {GraficoSaudeInputTypes,GraficoProsciInputTypes,GraficoSponsorPrimarioInputTypes,GraficoCoalizaoInputTypes} from '../../types/Projetos/ProjetosTypes'
import GraficoSaude from "./Graficos/GraficoSaude"
import GraficoPrsci from "./Graficos/GraficoProsci"
import GraficoSponserPrimario from "./Graficos/GraficoSponsorPrimario"
import GraficoCoalizaoPatrocinio from "./Graficos/GraficoCoalizaoPatrocinio";

interface RouteParams extends Record<string, string> {
  id: string;
}

const ProjetoPage = () => {
  const { id } = useParams<RouteParams>();
  const navigate = useNavigate();
  const [tabState,setTabState] = useState<number>(1);
  const [saudeDados,setSaudeDados] = useState<GraficoSaudeInputTypes>({
    'id':id,
    'descricao':'',
    'saude':{}}
  );

  const [prosciDados,setProsciDados] = useState<GraficoProsciInputTypes>({
    'id':id,
    'descricao':'',
    'prosci':{}});
  
  const [sponsorPrimarioDados, setSponsorPrimarioDados] = useState<GraficoSponsorPrimarioInputTypes>({
    'id':id,
    'descricao':'',
    'sponsor_primario':{}});
  
    const [coalizaoDados, setCoalizaoDados] = useState<GraficoCoalizaoInputTypes>({
      'id':id,
      'descricao':'',
      'coalizao_patrocinio':{}});

  const fetchDataSaudeProjeto =  async () => {
    try {
        const response = await api.get(`/projeto/projeto/get_saude_projeto?projeto_id=${id}`)
        setSaudeDados(response?.data)

    } catch (error){
        console.error(error)
    }
  };

  const fetchDataProsciProjeto =  async () => {
    try {
        const response = await api.get(`/projeto/projeto/get_prosci_projeto?projeto_id=${id}`)
        setProsciDados(response?.data)

    } catch (error){
        console.error(error)
    }
  };

  
  const fetchDataSponsorPrimarioProjeto =  async () => {
    try {
        const response = await api.get(`/projeto/projeto/get_sponsor_primario_projeto?projeto_id=${id}`)
        setSponsorPrimarioDados(response?.data)

    } catch (error){
        console.error(error)
    }
  };

  const fetchDataCoalizaoPatrocinioProjeto =  async () => {
    try {
        const response = await api.get(`/projeto/projeto/get_coalizao_patrocinio_projeto?projeto_id=${id}`)
        setCoalizaoDados(response?.data)
    } catch (error){
        console.error(error)
    }
  };

  
  useEffect(() => {
    fetchDataSaudeProjeto();
    fetchDataProsciProjeto();
    fetchDataSponsorPrimarioProjeto();
    fetchDataCoalizaoPatrocinioProjeto();
  }, [])

  useEffect(()=>{

  },[])

  return (
    <BackgroundProjeto>
        <DashboardContainer>
            <TabPojetos>
                <TabPojetosButotn style={{
                    background: tabState==1?'#e2e7f1':'none',
                    border: tabState==1?'1px solid #001969':'none',
                }}
                onClick={()=>setTabState(1)
                }>PCT</TabPojetosButotn>
                <TabPojetosButotn style={{
                    background: tabState==2?'#e2e7f1':'none',
                    border: tabState==2?'1px solid #001969':'none',
                }}
                onClick={()=>setTabState(2)
                }>Prosci</TabPojetosButotn>
                <TabPojetosButotn style={{
                    background: tabState==3?'#e2e7f1':'none',
                    border: tabState==3?'1px solid #001969':'none',
                }}
                onClick={()=>setTabState(3)
                }>Sponsor Primário</TabPojetosButotn>
                <TabPojetosButotn style={{
                    background: tabState==4?'#e2e7f1':'none',
                    border: tabState==4?'1px solid #001969':'none',
                }}
                onClick={()=>setTabState(4)
                }>Coalizão de Patrocínio</TabPojetosButotn>
            </TabPojetos>

            <div style={{width:'100%', height:'500px',marginTop:'50px'}}>
            {(tabState==1) &&
              <GraficoSaude data={saudeDados} />
            }
            {(tabState==2) &&
              <GraficoPrsci data={prosciDados} />
            }
            {(tabState==3)&&
              <GraficoSponserPrimario data={sponsorPrimarioDados} />
            }
            {(tabState==4)&&
              <GraficoCoalizaoPatrocinio data={coalizaoDados} />
            }
            </div>

            <div style={{height:'50px',width:'100%', display:'flex',justifyContent:'flex-start', alignItems:'center'}}>
            <AbortButton style={{width:'60px',marginLeft:'10px'}} onClick={()=>navigate('/home')}>Voltar</AbortButton>
            </div>
        </DashboardContainer>
    </BackgroundProjeto>
    
  )
}

export default ProjetoPage;


