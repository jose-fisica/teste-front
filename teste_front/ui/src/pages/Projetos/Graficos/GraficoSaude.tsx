
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../Projetos/StyledProjeto"

HighchartsMore(Highcharts);
interface RouteParams extends Record<string, string> {
    id: string;
  }

const GraficoSaude = (data:any) => {
    const handleStatus = (value:number) => {
        if(value <20){
            return 'Alto risco'
        } else if (value >=20 && value <25) {
            return 'Possível risco'
        } else if ( value>=25 ){
            return 'Força'
        }
    };
    const handleColor = (value:number) => {
        if(value <20){
            return '#ff4031'
        } else if (value >=20 && value <25) {
            return '#ffff4b'
        } else if ( value>=25 ){
            return '#4c9a47'
        }
    };
    const { id } = useParams<RouteParams>();
    const navigate = useNavigate();
    const options: Highcharts.Options = {
        chart: {
            polar: true,
            type: 'line',
        },
    
        title: {
            text: 'Gráfico de saúde de projeto',
        },
    
        pane: {
            size: '90%',
        },
    
        xAxis: {
            categories: data?.data?.saude && Object.keys(data?.data?.saude),
            tickmarkPlacement: 'on',
            lineWidth: 0,
        },
    
        yAxis: {
            gridLineInterpolation: 'polygon',
            lineWidth: 0,
            min: 0,
        },
    
        tooltip: {
            shared: true,
            pointFormat: '<span style="color:{series.color}">Projeto: <b>' +
                '{point.y}<br/>',
        },
    
        legend: {
            enabled:false,
            align: 'right',
            verticalAlign: 'middle',
            layout: 'vertical',
        },
    
        series: [
            {
                name: data?.descricao,
                data: data?.data?.saude && Object.values(data?.data?.saude) as (number | [string, number])[], // Adaptação do tipo
                pointPlacement: 'on',
            },
        ] as Highcharts.SeriesLineOptions[],
    
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500,
                },
                chartOptions: {
                    legend: {
                        align: 'center',
                        verticalAlign: 'bottom',
                        layout: 'horizontal',
                    },
                    pane: {
                        size: '90%',
                    },
                },
            }],
        },
    };
    return (
        <div style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'row'}}>
        {Object.keys(data?.data?.saude).length == 3 ?
            <div  style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'row',background:'#ffff'}}>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
                style={{ borderRadius: '8px', height: '1000px', zIndex: '-5' }}
            />
            <div >
             { Object.keys(data?.data?.saude).map(
                (key:string) =>(
                    <div style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'flex-start',flexDirection:'row'}}>
                    <div style={{border:'1px solid black', width:'50px', display:'flex',alignItems:'center',justifyContent:'center'}}>{key}</div>
                    <div style={{border:'1px solid black', width:'50px',display:'flex',alignItems:'center',justifyContent:'center'}}>{data?.data?.saude[key]}</div>
                    <div style={{
                        border:'1px solid black', 
                        width:'150px',
                        display:'flex',
                        alignItems:'center',
                        justifyContent:'center',
                        color:'#131212',
                        background:handleColor(data?.data?.saude[key]),
                        }}>{handleStatus(data?.data?.saude[key])}</div>
                    </div>
                )
             )

             }
             <Button style={{width:'auto',marginLeft:'10px',marginTop:'100px',background:'none',color:'black'}} onClick={()=>navigate(`/projeto-saude/${id}`)}>Editar dados</Button>
             </div>
             
            </div>
            : 
            <div style={{width:'95%',height:'400px',display:'flex',alignItems:'center',flexDirection:'column'}}>
                <h1>Dados faltantes, gerar relatório</h1>
                <Button style={{width:'auto',marginLeft:'10px',marginTop:'100px'}} onClick={()=>navigate(`/projeto-saude/${id}`)}>Clique Aqui para preencher dados faltantes</Button>
            </div>
        }
        </div>
        
        )
    
}
export default GraficoSaude;