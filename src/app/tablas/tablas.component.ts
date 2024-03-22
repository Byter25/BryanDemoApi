import { Campos } from './../Models/base';
import { Component, Input } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-tablas',
  templateUrl: './tablas.component.html',
  styleUrl: './tablas.component.css',
})
export class TablasComponent {
  // Entradas del componente que pueden ser proporcionados por un componente padre.
  @Input() tabla: string = '';
  @Input() campos: string[] = [];
  @Input() data: any[] = [];

  //Variables booleanas para controlar la visibilidad de los formularios
  //y el modal de confirmación de eliminación.
  formActualizar = false;
  formAgregar = false;
  modalEliminar = false;

  //Almacenará un registro único seleccionado para editar o eliminar.
  dataUnic: any;
  //Contendrá los tipos de datos de los campos del registro seleccionado.
  camposTipos: Campos[] = [];

  // El constructor inyecta el servicio 'AppService', que se utilizará para las operaciones CRUD.
  constructor(private api: AppService) {}

  // La función 'agregar' alterna la visibilidad del formulario para agregar un nuevo registro.
  // Si se va a mostrar el formulario, se inicializa 'dataUnic' con un registro vacío y se determinan sus tipos.
  agregar() {
    this.formAgregar = !this.formAgregar;
    if (this.formAgregar) {
      //truco para obtener los tipos ya que agregar no tiene parametros con informacion
      this.dataUnic = this.data[1];
      this.camposTipos = this.verTipos(this.dataUnic);
    }
  }

  // La función 'editar' alterna la visibilidad del formulario para actualizar un registro.
  // Si se va a mostrar el formulario, se inicializa 'dataUnic' con el registro a editar y se determinan sus tipos.
  editar(data: any) {
    this.formActualizar = !this.formActualizar;
    if (this.formActualizar) {
      this.camposTipos = this.verTipos(data);
      this.dataUnic = data;
    }
  }

  // La función 'eliminar' alterna la visibilidad del modal de confirmación de eliminación.
  // Si se va a mostrar el modal, se inicializa 'dataUnic' con el registro a eliminar.
  eliminar(data: any) {
    this.modalEliminar = !this.modalEliminar;
    if (this.modalEliminar) {
      this.dataUnic = data;
    }
  }

  // 'confirmDelete' llama al servicio 'api' para eliminar el registro seleccionado y oculta el modal.
  confirmDelete() {
    this.api.delete(this.tabla, this.dataUnic);
    this.modalEliminar = false;
  }

  // 'verTipos' determina los tipos de datos de los campos de un registro y los almacena en 'camposTipos'.
  verTipos(campos: any): Campos[] {
    const tipos: Campos[] = [];
    for (const key in campos) {
      if (Object.hasOwnProperty.call(campos, key)) {
        const value = campos[key];
        const type = typeof value;
        tipos.push({ nombre: key, tipo: type });
      }
    }
    return tipos;
  }
}
