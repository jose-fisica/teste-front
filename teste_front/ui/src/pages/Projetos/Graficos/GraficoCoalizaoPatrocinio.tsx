import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../Projetos/StyledProjeto"
import {SponsorKey} from "../../../components/SponsorKeys"

interface RouteParams extends Record<string, string> {
    id: string;
  }


const GraficoCoalizaoPatrocinio = (data:any) => {
    const { id } = useParams<RouteParams>();
    const navigate = useNavigate();


    return (
        <div style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'row',overflowX:'scroll'}}>
        {Object.keys(data?.data?.coalizao_patrocinio).length == 6?
            <div  style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'row',background:'#ffff'}}>
            <div style={{alignItems:'center',justifyContent:'center',marginTop:'80px',width:'20%',display:'flex',flexDirection:'column'}}>
            <table>
                <tbody>
                <tr key='1'>
                <td
                    key={'A1'}
                    style={{  width: '50px', height: '50px', textAlign: 'center' }}
                    >
                    A1
                    </td>
                    <td
                    key={'A1'}
                    style={{ backgroundColor: data?.data?.coalizao_patrocinio.A1.color, width: '50px', height: '50px', textAlign: 'center' }}
                    >
                    {data?.data?.coalizao_patrocinio.A1.count}
                </td>
        
                    <td
                    key={'B1'}
                    style={{ backgroundColor: data?.data?.coalizao_patrocinio.B1.color, width: '50px', height: '50px', textAlign: 'center' }}
                    >
                    {data?.data?.coalizao_patrocinio.B1.count}
                    </td>
                    <td
                    key={'B1'}
                    style={{  width: '50px', height: '50px', textAlign: 'center' }}
                    >
                    B1
                    </td>
                </tr>
                <tr key='2'>
                <td
                    key={'A2'}
                    style={{  width: '50px', height: '50px', textAlign: 'center' }}
                    >
                    A2
                    </td>
                    <td
                    key={'A2'}
                    style={{ backgroundColor: data?.data?.coalizao_patrocinio.A2.color, width: '50px', height: '50px', textAlign: 'center' }}
                    >
                    {data?.data?.coalizao_patrocinio.A2.count}
                </td>
        
                    <td
                    key={'B2'}
                    style={{ backgroundColor: data?.data?.coalizao_patrocinio.B2.color, width: '50px', height: '50px', textAlign: 'center' }}
                    >
                    {data?.data?.coalizao_patrocinio.B2.count}
                    </td>
                    <td
                    key={'B2'}
                    style={{  width: '50px', height: '50px', textAlign: 'center' }}
                    >
                    B2
                    </td>
                </tr>
                <tr key='3'>
                <td
                    key={'A3'}
                    style={{  width: '50px', height: '50px', textAlign: 'center' }}
                    >
                    A3
                    </td>
                    <td
                    key={'A3'}
                    style={{ backgroundColor: data?.data?.coalizao_patrocinio.A3.color, width: '50px', height: '50px', textAlign: 'center' }}
                    >
                    {data?.data?.coalizao_patrocinio.A3.count}
                </td>
                    <td
                    key={'B3'}
                    style={{ backgroundColor: data?.data?.coalizao_patrocinio.B3.color, width: '50px', height: '50px', textAlign: 'center' }}
                    >
                    {data?.data?.coalizao_patrocinio.B3.count}
                    </td>
                    <td
                    key={'B3'}
                    style={{  width: '50px', height: '50px', textAlign: 'center' }}
                    >
                    B3
                    </td>
                </tr>
                </tbody>
            </table>
            <Button style={{width:'auto',marginLeft:'10px',marginTop:'60px',background:'none',color:'black'}} onClick={()=>navigate(`/projeto-coalizao-patrocinio/${id}`)}>Editar dados</Button>
            </div>
            <SponsorKey/>
            </div>
            : 
            <div style={{width:'95%',height:'400px',display:'flex',alignItems:'center',flexDirection:'column'}}>
                <h1>Dados faltantes, gerar relatório</h1>
                <Button style={{width:'auto',marginLeft:'10px',marginTop:'100px'}} onClick={()=>navigate(`/projeto-coalizao-patrocinio/${id}`)}>Clique Aqui para preencher dados faltantes</Button>
            </div>
        }
        </div>
        
        )
    
}
export default GraficoCoalizaoPatrocinio;