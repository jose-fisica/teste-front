import {
  Container,
  ContainerHeader,
  ContainerDesc,
  Line,
  ContainerText,
  ContainerPerfil,
  CirclePerfil,
} from "./HeaderStyled";
import { useNavigate } from "react-router-dom";
import { getUser,clearToken } from "../utils/auth";

export const Header = () => {
  const navigate = useNavigate();
  const user = getUser()
  
  const userName = (value:any) =>{
    try{
        return JSON.parse(value).nm_pessoa
    } catch{
        return ''
    }
  }

  const handleSair = () =>{
    clearToken()
    navigate('/login')
  }

  return (
    <>
      <Container>
        <ContainerHeader>
          <ContainerDesc>
            <Line />
            <ContainerText>
              <span onClick={()=>navigate('/home')}>Projetos</span>
            </ContainerText>
          </ContainerDesc>
            <ContainerPerfil>
                <span onClick={handleSair} style={{color:'#e2e7f1'}}>sair</span>
              <CirclePerfil>
                {userName(user)&&userName(user)[0]}
              </CirclePerfil>
            </ContainerPerfil>
        </ContainerHeader>
      </Container>
    </>
  );
};
