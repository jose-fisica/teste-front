
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../StyledProjeto"

HighchartsMore(Highcharts);
interface RouteParams extends Record<string, string> {
    id: string;
  }

const GraficoPrsci = (data:any) => {
    const { id } = useParams<RouteParams>();
    const navigate = useNavigate();

    const options: Highcharts.Options = {
        chart: {
            type: 'scatter',
            zooming: {
                type: 'xy'
            }
        },
        title: {
            text: 'Avaliação de Risco Prosci'
        },
        xAxis: {
            title: {
                text: 'Características da Mudança'
            },
            min: 0,
            max: 60,
            startOnTick: true,
            endOnTick: true,
            showLastLabel: true,
            plotBands: [{
                from: -Infinity,
                to: 30,
                color: 'rgba(255, 255, 75, 0.1)' 
            }, {
                from: 30,
                to: Infinity,
                color: 'rgba(255, 64, 49, 0.1)'
            }]
        },
        yAxis: {
            title: {
                text: 'Atributos Organizacionais'
            },
            min: 0,
            max: 60,
            startOnTick: true,
            endOnTick: true,
            plotBands: [{
                from: -Infinity,
                to: 30,
                color: 'rgba(76, 154, 71, 0.1)' 
            }, {
                from: 30,
                to: Infinity,
                color: 'rgba(255, 255, 75, 0.1)' 
            }]
        },
        legend: {
            enabled:false,
            align: 'right',
            verticalAlign: 'middle',
            layout: 'vertical',
        },
        tooltip: {
            pointFormat: '<span style="color:{series.color}">Atributos Organizacionais: <b>' +
                '{point.y}<br/>'+'<span style="color:{series.color}">Características da Mudança: </b>'+'{point.x}<br/>',
        },
        series: [{
            name: 'Avaliação de risco',
            type: 'scatter',
            data: Object.values(data?.data?.prosci) && [
                [Object.values(data?.data?.prosci)[0], Object.values(data?.data?.prosci)[1]]
            ]
        }]
    };
    
    return (
        <div style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'row',overflowX:'scroll'}}>
        {Object.keys(data?.data?.prosci).length == 3 ?
            <div  style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'row',background:'#ffff'}}>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
                style={{ borderRadius: '8px', height: '1000px', zIndex: '-5' }}
            />
            <div style={{width:'20%',display:'flex',flexDirection:'column'}}>
             { Object.keys(data?.data?.prosci).map(
                (key:string) =>(
                    <div style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'flex-start',flexDirection:'row'}}>
                        {key!='status' &&
                        <>
                            <div style={{border:'1px solid black', width:'220px', display:'flex',alignItems:'center',justifyContent:'center'}}>{key}</div>
                            <div style={{border:'1px solid black', width:'50px',height:'40px',display:'flex',alignItems:'center',justifyContent:'center'}}>{data?.data?.prosci[key]}</div>
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
                        background:data?.data?.prosci?.status?.color,
                        }}>{data?.data?.prosci?.status?.nm_status}</div>
            <Button style={{width:'auto',marginLeft:'10px',marginTop:'100px',background:'none',color:'black'}} onClick={()=>navigate(`/projeto-prosci/${id}`)}>Editar dados</Button>
            </div>
            </div>
            : 
            <div style={{width:'95%',height:'400px',display:'flex',alignItems:'center',flexDirection:'column'}}>
                <h1>Dados faltantes, gerar relatório</h1>
                <Button style={{width:'auto',marginLeft:'10px',marginTop:'100px'}} onClick={()=>navigate(`/projeto-prosci/${id}`)}>Clique Aqui para preencher dados faltantes</Button>
            </div>
        }
        </div>
        
        )
    
}
export default GraficoPrsci;