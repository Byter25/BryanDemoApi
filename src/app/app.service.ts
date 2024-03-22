import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AppService {

  // URL base de la API para realizar operaciones CRUD.
  urlMiApi = 'https://apisenati25.azurewebsites.net/api';

  // Constructor que inyecta el cliente HTTP para realizar peticiones HTTP.
  constructor(private http: HttpClient) {}

  // Método para obtener todos los registros de una tabla específica.
  getAll(nomTabla: string): Observable<any> {
    // Realiza una petición GET a la URL compuesta y retorna un Observable.
    return this.http.get<any>(`${this.urlMiApi}/${nomTabla}/Get`);
  }

  // Método para agregar un nuevo registro a una tabla específica.
  add(nomTabla: string, data: any) {
    // Realiza una petición POST a la URL compuesta y convierte el Observable a una promesa.
    return firstValueFrom(
      this.http.post<any>(`${this.urlMiApi}/${nomTabla}/Add${nomTabla}`, data)
    );
  }

  // Método para actualizar un registro existente en una tabla específica.
  update(nomTabla: string, data: any) {
    // Realiza una petición POST a la URL compuesta y convierte el Observable a una promesa.
    return firstValueFrom(
      this.http.post<any>(
        `${this.urlMiApi}/${nomTabla}/Update${nomTabla}`,
        data
      )
    );
  }

  // Método para eliminar un registro de una tabla específica.
  delete(nomTabla: string, data: any) {
    // Realiza una petición POST a la URL compuesta y convierte el Observable a una promesa.
    return firstValueFrom(
      this.http.post<any>(
        `${this.urlMiApi}/${nomTabla}/Delete${nomTabla}`,
        data
      )
    );
  }
}
