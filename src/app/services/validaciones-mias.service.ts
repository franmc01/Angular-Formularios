import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { rejects } from 'assert';
import { resolve } from 'dns';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValidacionesMiasService {

  constructor() { }

  noMarin(control: FormControl): { [s: string]: boolean } {
    if (control.value?.toLowerCase() === 'marin2') {
      return { noMarin: true };
    }

    return null;
  }

  existeUsuario(control:FormControl):Promise<any> | Observable<any>{

    if(!control.value){
      return Promise.resolve(null);
    }

    let promesa=new Promise((resolve,rejects)=>{
      setTimeout(() => {
        if(control.value=="sisco"){
          resolve({usuarioExistente:true})
        }else{
          resolve(null)
        }
      }, 2000);
    })

    return promesa;
  }


  passwordIguales(pass1Name:string, pass2Name:string){
    return (miFormulario:FormGroup)=>{
      const pass1Control=miFormulario.controls[pass1Name];
      const pass2Control=miFormulario.controls[pass2Name];

      if(pass1Control.value===pass2Control.value){
         pass2Control.setErrors(null);
      }else{
        pass2Control.setErrors({noEsIgual:true})
      }
    }
  }
}
