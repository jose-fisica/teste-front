export type LoginPageProps = {
    className?: string;
  }
  
export type TFormLogin = {
  user: string;
  password: string;
}

export type Projeto = {
  id: number;
  descricao: string;
}
export type GraficoSaudeInputTypes = {
  id: number | string | undefined;
  saude: object;
  descricao: string;
}

export type GraficoProsciInputTypes = {
  id: number | string | undefined;
  prosci: object;
  descricao: string;
}

export type GraficoSponsorPrimarioInputTypes = {
  id: number | string | undefined;
  sponsor_primario: object;
  descricao: string;
}

export type GraficoCoalizaoInputTypes = {
  id: number | string | undefined;
  coalizao_patrocinio: object;
  descricao: string;
}
