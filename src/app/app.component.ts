import { Component } from '@angular/core';
import { AppService } from './app.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'BryanDemoApi';

  nomTabla = '';
  // Se declara un arreglo 'data' para almacenar cualquier tipo de datos.
  data: any[] = [];

  // Se define el constructor de la clase, que inyecta 'AppService' como 'api'.
  constructor(private api: AppService) {}

  // Se define la función 'obtenerData', que se activa con un evento.
  obtenerData(event: Event) {
    // Se asigna a 'nomTabla' el valor del elemento HTML seleccionado por el usuario.
    this.nomTabla = (event.target as HTMLSelectElement).value;
    // Se llama a la función 'getAll' de 'api', pasando 'nomTabla' como argumento.
    this.api.getAll(this.nomTabla).subscribe((d) => {
      // Se asignan los datos obtenidos a la variable 'data'.
      this.data = d;
      // Se imprime en consola el contenido de 'data'.
      console.log(this.data);
    });
  }
}
