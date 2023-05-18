import { Icon } from "../icon";

export type objValor = number | string | boolean;

export interface ControlItem{
  objValor:objValor;
  strLabel: string;
  objIcon?: Icon;
}
