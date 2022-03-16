import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
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
  items!: MenuItem[];
  displaySaveDialog: boolean=false;
  persona: Persona = {
    id: 0,
    nombre: "",
    apellido: "",
    direccion: "",
    telefono: ""
  };

  //hago la inyeccion de dependencias en el contructor llamando al service de persona
  constructor(private personaService: PersonaService, private messageService: MessageService) { }

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
/*menu*/
  showSaveDialog(){
    this.displaySaveDialog= true;
  }

  /*button*/
  save(){
    this.personaService.save(this.persona).subscribe(
      (result: any) => {
        let persona = result as Persona;
        this.personas.push(persona);
       // this.validarPersona(persona);
        this.messageService.add({ severity: 'success', summary: "Resultado", detail: "Se guardó la persona correctamente." });
         this.displaySaveDialog = false;

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
    ];
    /*menu*/
    this.items=[
      {
        label:"Nuevo",
        icon:'pi pi-fw pi-plus',
        command:()=> this.showSaveDialog()
      },
      {
        label:"Editar",
        icon:'pi pi-fw pi-pencil'
      }
    ]
  }

}
