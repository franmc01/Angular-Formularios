import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisService } from '../../services/pais.service';

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
    pais: ''
  };
  paises: any[] = [];

  constructor(private paisService:PaisService) {}

  ngOnInit(): void {
    console.log(this.paisService.getPaises().subscribe(paises => {
      this.paises = paises;
      this.paises.unshift({
        nombre: '[ Seleccione un pais ]',
        codigo: ''
        });
    }));
  }

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
