import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empresa } from 'src/app/components/empresas/Empresa';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {

  apiURL: string = environment.apiURLBase + '/api/empresas';

  constructor(private http: HttpClient) { }

  salvar(empresa: Empresa): Observable<Empresa>{
    return this.http.post<Empresa>(`${this.apiURL}`, empresa)
  }
  atualizar(empresa: Empresa): Observable<any>{
    return this.http.put<Empresa>(`${this.apiURL}/${empresa.id}`, empresa)
  }
  getEmpresa(): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(this.apiURL);
  }
  getEmpresaById(id: number) : Observable<Empresa>{
    return this.http.get<any>(`${this.apiURL}/${id}`);
  }
  getEmpresaByName(name: string) : Observable<Empresa[]>{
    return this.http.get<any>(`${this.apiURL}/search/${name}`);
  }
  deletar(empresa: Empresa): Observable<any>{
    return this.http.delete<Empresa>(`${this.apiURL}/${empresa.id}`)
  }
}
