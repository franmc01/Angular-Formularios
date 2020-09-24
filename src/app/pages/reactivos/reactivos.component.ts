import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactivos',
  templateUrl: './reactivos.component.html',
  styleUrls: ['./reactivos.component.css'],
})
export class ReactivosComponent implements OnInit {
  formulario: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.crearFormulario();
  }

  ngOnInit(): void {}

  crearFormulario() {
    this.formulario = this.formBuilder.group({
      // x: ['valorpordefecto', validadoresSincronos, validoresAsync ],
      name: ['', [Validators.required, Validators.minLength(4)]],
      lastName: ['', [Validators.required, Validators.minLength(4)]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z 0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      direccion: this.formBuilder.group({
        distrito: ['', [Validators.required, Validators.minLength(4)]],
        ciudad: ['', [Validators.required, Validators.minLength(4)]],
      }),
    });
  }

  get nombreNoValido() {
    return (
      this.formulario.get('name').invalid && this.formulario.get('name').touched
    );
  }
  get apellidoNoValido() {
    return (
      this.formulario.get('lastName').invalid &&
      this.formulario.get('lastName').touched
    );
  }
  get correoNoValido() {
    return (
      this.formulario.get('email').invalid &&
      this.formulario.get('email').touched
    );
  }
  get distritoNoValido() {
    return (
      this.formulario.get('direccion.distrito').invalid &&
      this.formulario.get('direccion.distrito').touched
    );
  }
  get ciudadNoValido() {
    return (
      this.formulario.get('direccion.ciudad').invalid &&
      this.formulario.get('direccion.ciudad').touched
    );
  }

  Guardar() {
    if (this.formulario.invalid) {
      return Object.values(this.formulario.controls).forEach((controls) => {
        if (controls instanceof FormGroup) {
          Object.values(controls.controls).forEach(control=> control.markAsTouched())
        } else {
          controls.markAllAsTouched();
        }
      });
    }
    console.log(this.formulario);
  }
}
