import styled from "@emotion/styled/macro";

// @ts-ignore
import background from "../../assets/background.svg"


export const Background = styled.div`
min-height: 100%;
height: 100vh;
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

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 350px;
  height: auto;
  padding: 20px 36px 20px 36px;
  border-radius: 4px;
  justify-content: space-around;
  box-shadow: 5px 5px 20px 0px #0000004D;
  background: #FFFFFF;
`
export const Input = styled.input`
margin-top:1rem;
height:30px;
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

