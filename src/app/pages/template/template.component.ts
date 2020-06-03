import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisesService } from '../../services/paises.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

usuario = {
  nombre: '',
  apellido: 'Daza',
  correo: 'jaimdaza@gmail.com',
  pais: 'VEN',
  sexo: 'm'
};

paises: any[] = [];

  constructor(private paisService: PaisesService) { }

  ngOnInit(): void {
    this.paisService.getPais().subscribe(paises => {
      this.paises = paises;
      this.paises.unshift({
        nombre: '[ Selecione Pais]',
        codigo: ''
      });
      console.log(paises);
    });
  }

  guardar(form: NgForm){
    if (form.invalid){
      Object.values(form.controls).forEach(control => {
        control.markAllAsTouched();
      });
    }
  }

}
