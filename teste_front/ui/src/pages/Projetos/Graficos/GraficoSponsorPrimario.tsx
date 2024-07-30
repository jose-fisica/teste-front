
import HighchartsReact from 'highcharts-react-official';
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../Projetos/StyledProjeto"

interface RouteParams extends Record<string, string> {
    id: string;
  }

const GraficoSponserPrimario = (data:any) => {
    const { id } = useParams<RouteParams>();
    const navigate = useNavigate();


    return (
        <div style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'row',overflowX:'scroll'}}>
        {Object.keys(data?.data?.sponsor_primario).length == 7 ?
            <div  style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'row',background:'#ffff'}}>
            <div style={{alignItems:'center',justifyContent:'center',marginTop:'80px',width:'20%',display:'flex',flexDirection:'column'}}>
             { Object.keys(data?.data?.sponsor_primario).map(
                (key:string) =>(
                    <div style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'flex-start',flexDirection:'row'}}>
                        {key!='status' &&
                        <>
                            <div style={{border:'1px solid black', height:'40px',width:'220px', display:'flex',alignItems:'center',justifyContent:'center'}}>{key}</div>
                            <div style={{border:'1px solid black', width:'50px',height:'40px',display:'flex',alignItems:'center',justifyContent:'center'}}>{data?.data?.sponsor_primario[key]}</div>
                        </>
                        }
                    </div>
                )
             )
             }
             <div style={{
                        border:'1px solid black', 
                        width:'216px',
                        display:'flex',
                        alignItems:'center',
                        justifyContent:'center',
                        color:'#131212',
                        background:data?.data?.sponsor_primario?.status?.color,
                        }}>{data?.data?.sponsor_primario?.status?.nm_status}</div>
            <Button style={{width:'auto',marginLeft:'10px',marginTop:'60px',background:'none',color:'black'}} onClick={()=>navigate(`/projeto-sponsor-primario/${id}`)}>Editar dados</Button>
            </div>
            </div>
            : 
            <div style={{width:'95%',height:'400px',display:'flex',alignItems:'center',flexDirection:'column'}}>
                <h1>Dados faltantes, gerar relatório</h1>
                <Button style={{width:'auto',marginLeft:'10px',marginTop:'100px'}} onClick={()=>navigate(`/projeto-sponsor-primario/${id}`)}>Clique Aqui para preencher dados faltantes</Button>
            </div>
        }
        </div>
        
        )
    
}
export default GraficoSponserPrimario;