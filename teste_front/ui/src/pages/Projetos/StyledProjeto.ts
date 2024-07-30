import styled from "@emotion/styled/macro";

// @ts-ignore
import background from "../../assets/background.svg"

export const BackgroundProjeto = styled.div`
min-height: 100%;
height: 92vh;
width: 100vw;
display: flex;
align-items: center;
justify-content: center;
background-size: cover;
background-position: center;
background-image:url(${background});
background-size: cover;
background-position: center;
`

export const DashboardContainer = styled.div`
width: 75vw;
height: 600px;
border-radius: 13px;
display: flex;
background:#c5cfe2;
align-items: center;
justify-content: flex-start;
flex-direction: column;
overflow-y: scroll;
background-position: center;
`
export const CardContainer = styled.div`
height: 500px;
margin-top: 1rem;
width: 73vw;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
background-size: cover;
background-position: center;
overflow-y: scroll;
`
export const Button = styled.div`
height: 30px;
display: flex;
padding:'10px';
align-items: center;
justify-content: center;
background-color: #2a4888;
color: #e2e7f1;
font-weight: 400;
border-color:1px solid #001969;
border-radius: 8px;
:hover{
    color:#2a4888;
    background-color: #e2e7f1;
}`

export const AbortButton = styled.div`
height: 30px;
display: flex;
padding:'10px';
align-items: center;
justify-content: center;
background-color: #ff4031;
color: #ffdad3;
font-weight: 400;
border-radius: 8px;
:hover{
    color:#ff4031;
    background-color: #ffdad3;
}`

export const CardProjetoDiv = styled.div`
max-height:50px;
min-height: 50px;
width:100%;
padding:10px;
display: flex;
align-items: center;
background:#f4f4f4;
border-Radius:16px;
margin-top:10px;
:hover{
    background:#d9d9d9
}
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 97%;
  overflow-y: scroll;
  padding: 20px 36px 20px 36px;
  border-radius: 4px;
`
export const FormInputTitle = styled.input`
width: 97%;
font-size: 16px;
display: flex;
align-items: flex-start;
justify-content: flex-start;
`


export const TabPojetos = styled.div`
width:97%;
justify-content: space-around;
border-bottom:2px solid #001969;
display:flex;
margin:10px
`


export const TabPojetosButotn = styled.div`
display:flex;
justify-content:center;
padding:2px;
margin-left:2px;
font-weight:bold;
border-top-right-radius:5px;
border-top-left-radius:5px;
`