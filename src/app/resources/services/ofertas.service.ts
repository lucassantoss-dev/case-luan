import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Oferta } from 'src/app/components/oferta/Oferta';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OfertasService {

  apiURL: string = environment.apiURLBase + '/api/ofertas';

  constructor(private http: HttpClient) { }

  salvar(oferta: Oferta): Observable<Oferta>{
    return this.http.post<Oferta>(`${this.apiURL}`, oferta)
  }
  atualizar(oferta: Oferta): Observable<any>{
    return this.http.put<Oferta>(`${this.apiURL}/${oferta.id}`, oferta)
  }
  getOferta(): Observable<Oferta[]> {
    return this.http.get<Oferta[]>(this.apiURL);
  }
  getOfertaById(id: number) : Observable<Oferta>{
    return this.http.get<any>(`${this.apiURL}/${id}`);
  }
  getOfertaByName(name: string) : Observable<Oferta[]>{
    return this.http.get<any>(`${this.apiURL}/search/${name}`);
  }
  deletar(oferta: Oferta): Observable<any>{
    return this.http.delete<Oferta>(`${this.apiURL}/${oferta.id}`)
  }
}
