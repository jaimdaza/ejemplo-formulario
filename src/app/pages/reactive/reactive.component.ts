import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ValidadoresService } from '../../services/validadores.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder,
              private validadores: ValidadoresService) {
    this.crearFormulario();
    this.cargarDatosForm();
    this.crearListener();
   }

  ngOnInit(): void {
  }

  get nombreNoValido(){
    return this.form.get('nombre').invalid && this.form.get('nombre').touched;
  }

  get apellidoNoValido(){
    return this.form.get('apellido').invalid && this.form.get('apellido').touched;
  }

  get correoNoValido(){
    return this.form.get('correo').invalid && this.form.get('correo').touched;
  }

  get regionNoValido(){
    return this.form.get('direccion.region').invalid && this.form.get('direccion.region').touched;
  }

  get provinciaNoValido(){
    return this.form.get('direccion.provincia').invalid && this.form.get('direccion.provincia').touched;
  }

  get comunaNoValido(){
    return this.form.get('direccion.comuna').invalid && this.form.get('direccion.comuna').touched;
  }

  get pasatiempos(){
    return this.form.get('pasatiempos') as FormArray;
  }

  get pass1NoValido(){
    return this.form.get('pass1').invalid && this.form.get('pass1').touched;
  }

  get pass2NoValido(){
    const pass1 = this.form.get('pass1').value;
    const pass2 = this.form.get('pass2').value;
    return (pass1 === pass2 ) ? false : true;
  }

  get usurioNoValido(){
    return this.form.get('usuario').invalid && this.form.get('usuario').touched;
  }

  crearFormulario(){
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      apellido: ['', [Validators.required, Validators.minLength(3),this.validadores.noHerrera]],
      correo: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$')]],
      pass1: ['', Validators.required],
      pass2: ['', Validators.required],
      usuario: ['', , this.validadores.existeUsuario],
      direccion: this.fb.group({
        region: ['', Validators.required] ,
        provincia: ['', Validators.required] ,
        comuna: ['', Validators.required]
      }),
      pasatiempos: this.fb.array([])
    }, {
      validators: this.validadores.passwordsIguales('pass1', 'pass2')
    });
  }

  guardar(){
    console.log(this.form);
    if (this.form.invalid){
      Object.values(this.form.controls).forEach(control => {
        control.markAllAsTouched();
      });
    }
    //this.form.reset(); // resetear los valores del formulario
  }

  // cargar valores al formulario
  cargarDatosForm(){
    this.form.reset({
      nombre: 'Jaime',
     apellido: 'Daza',
      correo: 'j@gmail.com',
      direccion: {
        region: 'Santiago',
        provincia: 'Santiago',
        comuna: 'Santigo'
      },
      pasatiempos: [],
      pass1: '',
      pass2: ''
      });
 // this.form.setValue({
 //   nombre: 'Jaime',
 //  apellido: 'Daza',
 //   correo: 'j@gmail.com',
 //   direccion: {
 //     region: 'Santiago',
  //    provincia: 'Santiago',
 //     comuna: 'Santigo'
 //   },
 //   pasatiempos: [],
 //   pass1: '',
 //   pass2: ''
  //  });
  // ['Jugar', 'Comer'].forEach( valor => this.pasatiempos.push(this.fb.control(valor)));
  }

  agregarPasatiempo(){
    this.pasatiempos.push(this.fb.control(''));
  }

  borrarPasatiempo(i: number){
    this.pasatiempos.removeAt(i);
  }

  crearListener(){
  // todos los cambios en el formulario
  this.form.valueChanges.subscribe(valor => {
  });
   // cambio en algun elemento en especifico
  this.form.get('nombre').valueChanges.subscribe(valor => {
  });
// verificando los estados
  this.form.statusChanges.subscribe(valor => {
  });
  }
}
