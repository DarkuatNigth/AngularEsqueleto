import { Item, ControlItem, Icon } from "@app/models/frontend";
export { Item, ControlItem, Icon } from "@app/models/frontend";


export interface Diccionarios{
  lstRol: objDiccionario;
  objEspecializacion: objDiccionario;
  lstCalificaciones: objDiccionario;
  lstHabilidades: objDiccionario;
}

export interface objDiccionario{
  lstItem: Item[];
  lstControlItem: ControlItem[];
}
