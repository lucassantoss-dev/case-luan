import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lance } from 'src/app/components/lance/Lance';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LancesService {

  apiURL: string = environment.apiURLBase + '/api/lances';

  constructor(private http: HttpClient) { }

  salvar(lance: Lance): Observable<Lance>{
    return this.http.post<Lance>(`${this.apiURL}`, lance)
  }
  atualizar(lance: Lance): Observable<any>{
    return this.http.put<Lance>(`${this.apiURL}/${lance.id}`, lance)
  }
  getLance(): Observable<Lance[]> {
    return this.http.get<Lance[]>(this.apiURL);
  }
  getLanceById(id: number) : Observable<Lance>{
    return this.http.get<any>(`${this.apiURL}/${id}`);
  }
  getLaceByName(name: string) : Observable<Lance[]>{
    return this.http.get<any>(`${this.apiURL}/search/${name}`);
  }
  deletar(lance: Lance): Observable<any>{
    return this.http.delete<Lance>(`${this.apiURL}/${lance.id}`)
  }
}
