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
  @Output() saliry = new EventEmitter<boolean>();
  @Input() data: any;
  @Input() accion!: string;
  @Input() camposTipo: Campos[] = [];
  @Input() tabla!: string;

  formDynamic: FormGroup;

  constructor(private api: AppService, private fb: FormBuilder) {
    this.formDynamic = this.fb.group({});
  }

  ngOnInit(): void {
    this.camposTipo.forEach((e) => {
      this.formDynamic.addControl(
        e.nombre,
        this.fb.control('', Validators.required)
      );
    });
    if (this.accion == 'actualizar') {
      this.formDynamic.setValue(this.data);
    }
  }
  salir() {
    this.saliry.emit(false);
  }

  submitForm() {
    if (this.accion == 'guardar') {
      this.api.add(this.tabla, this.formDynamic.value);
    }
    if (this.accion == 'actualizar') {
      this.api.update(this.tabla, this.formDynamic.value);
    }
  }
}
