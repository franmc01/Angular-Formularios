import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidacionesMiasService {

  constructor() { }

  noMarin(control: FormControl): { [s: string]: boolean } {
    if (control.value?.toLowerCase() === 'marin') {
      return { noMarin: true };
    }

    return null;
  }
}
