import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

interface ErrorValidate{
  [s: string]: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {

  constructor() { }


  noHerrera(control: FormControl): ErrorValidate {
  if ( control.value?.toLowerCase() === 'herrera'){
    return {noHerrera: true};
  }
  return null;
  }

  passwordsIguales(pass1: string, pass2: string){
    console.log('validar paas');
    return (formGroup: FormGroup ) => {
      const pass1Control = formGroup.controls[pass1];
      const pass2Control = formGroup.controls[pass2];
      if (pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null);
        console.log('no error');
      }else{
        pass2Control.setErrors({noEsigual: true});
        console.log('si error');
      }
    };
  }

  existeUsuario(control: FormControl): Promise<ErrorValidate> | Observable<ErrorValidate>{
    if (!control.value){
      return Promise.resolve(null);
    }
    return new Promise( (resolve, reject) => {
        setTimeout(() => {
      if (control.value === 'daza'){
        resolve({existe: true});
      } else {
        resolve(null);
      }
        }    , 3500);
    });
  }
}
