import styled from "@emotion/styled/macro";

// @ts-ignore
import background from "../../assets/background.svg"

export const BackgroundHome = styled.div`
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

export const FilterCreate = styled.div`
min-height: 5vh;
padding: 5px;
width: 75vw;
display: flex;
align-items: center;
justify-content: space-between;
background-color: #b5b5b5;
background-size: cover;
background-position: center;
border-top-left-radius: 13px;
border-top-right-radius: 13px;
`
export const DashboardContainer = styled.div`
width: 75vw;
border-radius: 13px;
display: flex;
background:#c5cfe2;
align-items: center;
justify-content: center;
flex-direction: column;
background-position: center;
`
export const CardContainer = styled.div`
height: 500px;
margin-top: 0rem;
width: 73vw;
display: flex;
justify-content: flex-start;
flex-direction: column;
background-size: cover;
background-position: center;
overflow-y: scroll;
`
export const Button = styled.div`
background-color: #2a4888;
color: #e2e7f1;
font-weight: 400;
border-color:1px solid #001969;
border-radius: 8px;
:hover{
    color:#2a4888;
    background-color: #e2e7f1;
}
`
export const Input = styled.input`
width: 95%;
border-radius:6px;
border:none;
height:30px;
`