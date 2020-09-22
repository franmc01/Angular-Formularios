import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css'],
})
export class TemplateComponent implements OnInit {
  usuario = {
    nombre: 'Francisco',
    apellido: 'Marin',
    email: 'francmarinc@gmail.com',
  };

  constructor() {}

  ngOnInit(): void {}

  infoFormulario(formtemplate: NgForm) {
    // console.log(formtemplate);
    if (formtemplate.invalid) {
      Object.values(formtemplate.controls).forEach((controls) => {
        controls.markAllAsTouched();
      });
      return;
    } else {
      console.log('Datos del formulario');
      console.log(formtemplate.value);
    }
  }
}
