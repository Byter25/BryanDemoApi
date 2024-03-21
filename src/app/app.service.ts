import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AppService {

  url = "https://apisenati25.azurewebsites.net/api/Empresa/Get"
  urlMiApi = "https://apisenati25.azurewebsites.net/api"

  constructor(private http:HttpClient) { }

  getAll(nomTabla:string):Observable<any>{
    return this.http.get<any>(`${this.urlMiApi}/${nomTabla}/Get`)
  }

  add(nomTabla:string,data:any){
    return firstValueFrom(this.http.post<any>(`${this.urlMiApi}/${nomTabla}/Add${nomTabla}`,data))
  }

  update(nomTabla:string,data:any){
    return firstValueFrom(this.http.post<any>(`${this.urlMiApi}/${nomTabla}/Update${nomTabla}`,data))
  }

  delete(nomTabla:string,data:any){
    return firstValueFrom(this.http.post<any>(`${this.urlMiApi}/${nomTabla}/Delete${nomTabla}`,data))
  }
}
