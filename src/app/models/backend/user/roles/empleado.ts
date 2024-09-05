export interface Empleado
{
    objSpecialization:Especializacion;
    objHabilidades:Habilidades[];
    objCalificacion:Calificacion;
    nbSalarioEsperado:number;
    lstExperiencia: Experiencia[];
}

interface Especializacion
{
  strId:string;
  strNombre:string;
}

interface Calificacion
{
  strId:string;
  strNombre:string;
}

interface Habilidades
{
  strId:string;
  strNombre:string;
}

interface Experiencia
{
  strNombreCompania:string;
  objPeriodo: Periodo;
}

interface Periodo {
  nbFrom: number;
  nbTo: number;
}
