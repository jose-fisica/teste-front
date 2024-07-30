import { IconProp } from "@fortawesome/fontawesome-svg-core"

export interface ICircleIconContainer {
  backgroundColor?: string;
  color?: string;
}

export interface ICardHome {
  icon: IconProp;
  color?: string;
  backgroundColor?: string;
  title?: string;
  description: string;
  link?: string;
  svg?: string;
  itemId?: number;
}

export interface ICardInfoHome {
  type: "item" | "recurso" | "atividade" | "trilha" | "avaliacao";
  data: any
}
