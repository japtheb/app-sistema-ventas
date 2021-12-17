import { Injectable } from '@angular/core';
import { ITipos_documentos } from '../../models/tipos_documento.model';
import { Client, IClient } from '../../models/clients.models';
import { ROOT_URL } from '../../../config';
import { Observable } from 'rxjs';  
import { HttpClient, HttpParams, HttpHeaders, HttpResponse } from '@angular/common/http';  

type EntityResponseType = HttpResponse<IClient>;
@Injectable({providedIn: 'root'})
export class ClientsService {
  tipos_documento: Observable<ITipos_documentos[]> | undefined;  
  tipoDocumento: ITipos_documentos | undefined;  

  constructor(private http: HttpClient) { }  

  create(client: IClient): Observable<EntityResponseType> {
    return this.http.post<IClient>(ROOT_URL + 'Clientes', client, { observe: 'response' });
  }
  update(client: IClient): Observable<EntityResponseType> {
    return this.http.put<IClient>(ROOT_URL + 'Clientes/'+client.Id_Cliente, client, { observe: 'response' });
  }
  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(ROOT_URL+ 'Clientes/'+id, { observe: 'response' });
  }

  getClients(){
    return this.http.get<IClient[]>(ROOT_URL + 'Clientes');  
  }
  getdocuments() {  
    return this.http.get<ITipos_documentos[]>(ROOT_URL + 'Tipos_Documento');  
  }  
}
