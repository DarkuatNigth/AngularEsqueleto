import { ControlItem } from "@app/models/frontend";

export const markFormGroupTouched = (objFormGroup: any) => {
  (Object as any).values(objFormGroup.controls).forEach((objControl:any) => {
    objControl.markAsTouched();
    if(objControl.controls){
      markFormGroupTouched(objControl);
    }
  });
}

export interface Control{
  lstItem?: ControlItem[];
  objChanged? :()=>void;
  objMap?:(()=>void) | any;
}

export interface ControlEntities {
  [key: string]: Control;
}

export const mapControls = (objControls: ControlEntities): void=>{
  Object.keys(objControls).forEach((strkey:string)=>{
   if(objControls[strkey].objMap){
    objControls[strkey].objMap();
   }
  })
}
