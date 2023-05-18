export const markFormGroupTouched = (objFormGroup: any) => {
  (Object as any).values(objFormGroup.controls).forEach((objControl:any) => {
    objControl.markAsTouched();
    if(objControl.controls){
      markFormGroupTouched(objControl);
    }
  });
}
