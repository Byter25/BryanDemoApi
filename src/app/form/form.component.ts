import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Campos } from '../Models/base';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent {
  @Output() saliry = new EventEmitter<boolean>(); //Evento que emitirá un valor booleano.
  @Input() data: any; // Se reciben datos de entrada para el formulario.
  @Input() accion!: string; // Se recibe la acción a realizar, que puede ser 'guardar' o 'actualizar'.
  @Input() camposTipo: Campos[] = []; // Se reciben los campos y sus tipos para construir el formulario.
  @Input() tabla!: string; // Se recibe el nombre de la tabla con la que se trabajará.

  formDynamic: FormGroup; //Un grupo de controles de formulario.

  // El constructor inyecta el servicio 'AppService' y el constructor de formularios 'FormBuilder'.
  constructor(private api: AppService, private fb: FormBuilder) {
    // Se inicializa 'formDynamic' como un grupo vacío.
    this.formDynamic = this.fb.group({});
  }

  // 'ngOnInit' se ejecuta al iniciar el componente.
  ngOnInit(): void {
    // Se itera sobre 'camposTipo' y se añaden controles al formulario por cada campo.
    this.camposTipo.forEach((e) => {
      this.formDynamic.addControl(
        e.nombre,
        this.fb.control('', Validators.required)
      );
    });
    // Si la acción es 'actualizar', se establecen los valores del formulario con 'data'.
    if (this.accion == 'actualizar') {
      this.formDynamic.setValue(this.data);
    }
  }

  // La función 'salir' emite un evento para cerrar el formulario.
  salir() {
    this.saliry.emit(false);
  }

  // 'submitForm' maneja la presentación del formulario.
  submitForm() {
    // Si la acción es 'guardar', se llama al servicio 'api' para agregar un nuevo registro.
    if (this.accion == 'guardar') {
      this.api.add(this.tabla, this.formDynamic.value);
    }
    // Si la acción es 'actualizar', se llama al servicio 'api' para actualizar el registro.
    if (this.accion == 'actualizar') {
      this.api.update(this.tabla, this.formDynamic.value);
    }
  }
}
