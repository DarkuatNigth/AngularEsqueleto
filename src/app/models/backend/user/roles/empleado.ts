export interface Empleado
{
    objSpecialization:Especializacion | null | any | undefined;
    objHabilidades:Habilidades[] | any[];
    objCalificacion:Calificacion | null | any | undefined;
    nbSalarioEsperado:number;
    lstExperiencia: Experiencia[] | any;
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
  strNombreEmpresa: string;
  objPeriodo: Periodo;
}

interface Periodo{
  nqnDesde: number;
  nqnHasta: number;
}
