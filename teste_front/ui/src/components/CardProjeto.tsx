
import { CardProjetoDiv } from "../pages/Projetos/StyledProjeto";
import {Projeto} from "../types/Projetos/ProjetosTypes"
import { useNavigate } from "react-router-dom";

interface CardProjetoProps {
    projeto: Projeto;
  }

const CardProjeto = ({projeto}:CardProjetoProps) => {
  const navigate = useNavigate();
  return (
        <CardProjetoDiv onClick={() => navigate(`/projeto/${projeto?.id}`)}>
            <span style={{fontSize:'16px',fontWeight:'bold'}}>Nome:</span> {projeto?.descricao}
        </CardProjetoDiv>
  )
}

export default CardProjeto;
