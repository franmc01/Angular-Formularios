import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ValidacionesMiasService } from '../../services/validaciones-mias.service';

@Component({
  selector: 'app-reactivos',
  templateUrl: './reactivos.component.html',
  styleUrls: ['./reactivos.component.css'],
})
export class ReactivosComponent implements OnInit {
  formulario: FormGroup;

  constructor(private formBuilder: FormBuilder, private validacionesMias: ValidacionesMiasService) {
    this.crearFormulario();
    this.cargarDataAlFormulario();
    this.crearListeners();
  }

  ngOnInit(): void { }

  crearFormulario() {
    this.formulario = this.formBuilder.group({
      // x: ['valorpordefecto', validadoresSincronos, validoresAsync ],
      name: ['', [Validators.required, Validators.minLength(4)]],
      lastName: ['', [Validators.required, Validators.minLength(4), this.validacionesMias.noMarin]],
      email: ['', [Validators.required, Validators.pattern('[a-z 0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),],],
      usuario: ['', , this.validacionesMias.existeUsuario],
      pass1: ['', [Validators.required]],
      pass2: ['', [Validators.required]],
      direccion: this.formBuilder.group({
        distrito: ['', [Validators.required, Validators.minLength(4)]],
        ciudad: ['', [Validators.required, Validators.minLength(4)]],
      }),
      pasatiempos: this.formBuilder.array([])
    }, {
      validators: this.validacionesMias.passwordIguales('pass1', 'pass2')
    });
  }

  crearListeners(){
    this.formulario.get('name').valueChanges.subscribe(value=>{
      console.log(value);
    })
  }

  get nombreNoValido() { return ( this.formulario.get('name').invalid && this.formulario.get('name').touched ); }
  get apellidoNoValido() { return ( this.formulario.get('lastName').invalid && this.formulario.get('lastName').touched ); }
  get correoNoValido() { return ( this.formulario.get('email').invalid && this.formulario.get('email').touched ); }
  get distritoNoValido() { return ( this.formulario.get('direccion.distrito').invalid && this.formulario.get('direccion.distrito').touched ); }
  get ciudadNoValido() { return ( this.formulario.get('direccion.ciudad').invalid && this.formulario.get('direccion.ciudad').touched ); }
  get pass1NoValido() { return ( this.formulario.get('pass1').invalid && this.formulario.get('pass1').touched ); }

  get pass2NoValido() {
    const pass1 = this.formulario.get('pass1').value;
    const pass2 = this.formulario.get('pass2').value;
    return (pass1 === pass2) ? false : true;
  }

  get usuarioNoValido() { return this.formulario.get('usuario').invalid && this.formulario.get('usuario').touched; }
  get pasatiempos() { return this.formulario.get('pasatiempos') as FormArray; }
  get usuario(){ return this.formulario.get('usuario').value; }


  agregarPasatiempos() {
    this.pasatiempos.push(this.formBuilder.control('', Validators.required));
  }

  borrarPasatiempos(i: number) {
    this.pasatiempos.removeAt(i);
  }

  Guardar() {
    if (this.formulario.invalid) {
      return Object.values(this.formulario.controls).forEach((controls) => {
        if (controls instanceof FormGroup) {
          Object.values(controls.controls).forEach(control => control.markAsTouched())
        } else {
          controls.markAllAsTouched();
        }
      });
    }
    // console.log(this.formulario);

    //Posteo de la informacion
    this.formulario.reset();
  }

  cargarDataAlFormulario() {
    this.formulario.reset({
      name: 'Francisco',
      lastName: 'Marin',
      email: 'francisco@espam.edu.ec',
      pass1: '123456',
      pass2: '123456',
      direccion: {
        distrito: 'Canuto',
        ciudad: 'Ottawa'
      }
    });
    ['Comer'].forEach(valor => this.pasatiempos.push(this.formBuilder.control(valor)));
  }
}
