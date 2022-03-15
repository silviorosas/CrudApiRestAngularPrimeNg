import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/model/persona';
import { PersonaService } from '../service/persona.service';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {
//creo array personas
  //creo array personas
  personas!: Persona[];
  cols!: any[];

  //hago la inyeccion de dependencias en el contructor llamando al service de persona
  constructor(private personaService: PersonaService) { }

  getAll() {
    this.personaService.getAll().subscribe(
      (result: any) => {
        let personas: Persona[] = [];
        for (let i = 0; i < result.length; i++) {
          let persona = result[i] as Persona;
          personas.push(persona);
        }
        this.personas = personas;
      },
      error => {
        console.log(error);
      }
    );
  }


  ngOnInit(): void {
    this.getAll();
    this.cols=[
      {field: "id", header: "Id"},
      {field: "nombre", header: "Nombre"},
      {field: "apellido", header: "Apellido"},
      {field: "direccion", header: "Dirección"},
      {field: "telefono", header: "Teléfono"}
    ]
  }

}
