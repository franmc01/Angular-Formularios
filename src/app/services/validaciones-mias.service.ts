import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

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
