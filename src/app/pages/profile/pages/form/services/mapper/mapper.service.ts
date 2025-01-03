import { Injectable } from '@angular/core';
import { objProfileForm } from '../../form.component';
import { objEmployeeForm } from '../../components/professional/roles/employee/employee.component';
import { objRecruiterForm } from '../../components/professional/roles/recruiter/recruiter.component';
import {  Usuario, UserCreateRequest, Empleado, Reclutador } from '@app/store/user';

import { Diccionarios } from '@app/store/dictionaries';

@Injectable({
  providedIn: 'root'
})

export class MapperService {

  constructor() { }

  userToForm(user : Usuario) : objProfileForm{
   return {
    objPersonal:{
      strName: user ? user.strNombre : null,
      strFotoUrl: user ? user.strFotoURL : null,
      strCodigoPais: user ? user.strPais: null
    },
    objProfessional:{
      strSobre : user ? user.strAcerca : null,
      nqnRoleId : user ? user.strRoleId : null,
      strRole : user ? this.getFormRole(user) : null,
    }
   }
  }

  private getFormRole(user: Usuario): objEmployeeForm | objRecruiterForm | null{
     if(user.strRoleId === '1'){
      const objRole = user.objRole as Empleado;
      const formRole : objEmployeeForm = {
        nqnSalarioEsperado : objRole.nbSalarioEsperado,
        strEspecializacion : objRole.objSpecialization.strId,
        strCualificacion : objRole.objCalificacion.strId,
        lstHabilidades : objRole.objHabilidades.map((x:any) => x.strId),
        objExperiencia : objRole.lstExperiencia
      }
      return formRole;
     }
     if(user.strRoleId === '2'){
      const objRole = user.objRole as Reclutador;
      const formRole : objRecruiterForm = {
        strNombreEmpresa : objRole.strNombreCompania,
        nqnNumeroEmpleados : objRole.nbCantidadEmpleados,
        objExperiencia :[]
      }
      return formRole;
     }
     return null;
  }
  formToUserCreate(objForm: objProfileForm, objDiccionario : Diccionarios) : UserCreateRequest{

    return{
      strNombre: objForm.objPersonal?.strName  || null,
      strFotoURL : objForm.objPersonal?.strFotoUrl || null,
      strRoleId : objForm.objProfessional?.nqnRoleId,
      strPais : objForm.objPersonal?.strCodigoPais || null,
      strAcerca : objForm.objProfessional?.strSobre,
      objRole: this.getRole(objForm, objDiccionario),

    }

  }

  private getRole(objForm : objProfileForm, objDiccionario: Diccionarios): Empleado | Reclutador | null{

    if(objForm.objProfessional?.nqnRoleId ==='1'){
      const formRole = objForm.objProfessional.strRole as objEmployeeForm;
      const objRole: Empleado = {
        nbSalarioEsperado: formRole.nqnSalarioEsperado,
        objSpecialization: objDiccionario.objEspecializacion.lstItem.find(x=>x.strId === formRole.strEspecializacion) || null,
        objCalificacion: objDiccionario.lstCalificaciones.lstItem.find(x=>x.strId === formRole.strCualificacion) || null,
        objHabilidades: formRole.lstHabilidades.map(id=> objDiccionario.lstHabilidades.lstControlItem.find(x=> x.objValor === id)),
        lstExperiencia: objForm.objProfessional.strRole?.objExperiencia

      }
      return objRole;
    }

    if(objForm.objProfessional?.nqnRoleId ==='2'){
      const formRole = objForm.objProfessional.strRole as objRecruiterForm;
      const objRole: Reclutador = {
         nbCantidadEmpleados : formRole.nqnNumeroEmpleados,
         strNombreCompania : formRole.strNombreEmpresa

      }
      return objRole;
    }
      return null;
  }

  formToUserUpdate(objForm: objProfileForm,objUser:Usuario, objDiccionario: Diccionarios ) : Usuario{
    return{
      strUid:objUser.strUid,
      strNombre: objForm.objPersonal?.strName,
      strFotoURL: objForm.objPersonal?.strFotoUrl,
      strPais: objUser.strPais,
      strAcerca: objForm.objProfessional?.strSobre,
      strRoleId: objForm.objProfessional?.nqnRoleId,
      objRole: this.getRole(objForm,objDiccionario),
      dtFechaCrea: objUser.dtFechaCrea,
      dtFechaActualiza: objUser.dtFechaActualiza
    }
  }



}

