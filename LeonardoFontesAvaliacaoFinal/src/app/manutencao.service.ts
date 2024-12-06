import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Manutencao } from './manutencao';

@Injectable({
  providedIn: 'root'
})
export class ManutencaoService {
  private apiURL = "http://academico3.rj.senac.br";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  }
  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<any> {
    return this.httpClient.get(this.apiURL + '/manutencao/')
    .pipe(
    catchError(this.errorHandler)
    )
  }

  criar(manutencao:Manutencao): Observable<any> {
    return this.httpClient.post(this.apiURL + '/manutencao/',
    JSON.stringify(manutencao), this.httpOptions)
    .pipe(
    catchError(this.errorHandler)
    )
  }
  buscar(manutencao_id:number): Observable<any> {
      return this.httpClient.get(this.apiURL + '/manutencao/' + manutencao_id)
      .pipe(
      catchError(this.errorHandler)
      )
  }
  atualizar(manutencao_id:number, manutencao:Manutencao): Observable<any> {
    return this.httpClient.put(this.apiURL + '/manutencao/' + manutencao_id,
    JSON.stringify(manutencao), this.httpOptions)
    .pipe(
    catchError(this.errorHandler)
    )
  }
  apagar(manutencao_id:number){
    return this.httpClient.delete(this.apiURL + '/manutencao/' + manutencao_id,
    this.httpOptions)
    .pipe(
    catchError(this.errorHandler)
    )
  }
  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
    errorMessage = error.error.message;
    } else {
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
