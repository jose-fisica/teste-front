import styled from '@emotion/styled/macro'


export const Container = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: 80px;
  background-color:#001969;
  padding: 16px;
`

export const ContainerHeader = styled.div`
  max-width: 1216px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0px 16px;
  @media screen and (max-width: 768px) {
    max-width: 768px;
  }

  @media screen and (max-width: 600px) {
    max-width: 600px;
  }
`

export const ContainerDesc = styled.div`
  display: flex;
  align-items: center;
  max-height: 40px;
  gap: 16px;
`

export const Line = styled.div`
  height: 40px;
  width: 1px;
  background-color: white;
`

export const ContainerPerfil = styled.div`
  max-height: 40px;
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: center;
`

export const CirclePerfil = styled.div`
  border: 2.6px solid white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color:#001969;
  background-color: #e2e7f1;
  font-size: 18px;
  font-weight: bold;
  overflow: hidden;
  text-align: center;
`

export const ContainerText = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  color: white;
  justify-content: space-around;
`