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
  };

  constructor(private paisService:PaisService) {}

  ngOnInit(): void {
    console.log(this.paisService.getPaises().subscribe(paises => {
      console.log(paises);
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
