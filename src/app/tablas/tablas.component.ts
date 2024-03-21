import { Campos } from './../Models/base';
import { Component, Input } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-tablas',
  templateUrl: './tablas.component.html',
  styleUrl: './tablas.component.css',
})
export class TablasComponent {
  @Input() tabla: string = '';
  @Input() campos: string[] = [];
  @Input() data: any[] = [];

  formActualizar = false;
  formAgregar = false;
  modalEliminar = false;

  dataUnic: any;
  camposTipos: Campos[] = [];

  constructor(private api: AppService) {}

  agregar() {
    this.formAgregar = !this.formAgregar;

    if (this.formAgregar) {
      this.dataUnic = this.data[1];
      this.camposTipos = this.verTipos(this.dataUnic);
    }
  }

  editar(data: any) {
    this.formActualizar = !this.formActualizar;
    if (this.formActualizar) {
      this.camposTipos = this.verTipos(data);
      this.dataUnic = data;
    }
  }

  eliminar(data: any) {
    this.modalEliminar = !this.modalEliminar;
    if (this.modalEliminar) {
      this.dataUnic = data;
    }
  }

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
  confirmDelete() {
    this.api.delete(this.tabla, this.dataUnic);
    this.modalEliminar = false;
  }
}
