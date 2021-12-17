import { Injectable } from '@angular/core';
import { ITipos_documentos } from '../../models/tipos_documento.model';
import { Ventas, IVentas } from '../../models/ventas.model';
import { ROOT_URL } from '../../../config';
import { Observable } from 'rxjs';  
import { HttpClient, HttpParams, HttpHeaders, HttpResponse } from '@angular/common/http';  

type EntityResponseType = HttpResponse<IVentas>;
@Injectable({
  providedIn: 'root'
})
export class SalesService {

  constructor(private http: HttpClient) { }  
  create(venta: IVentas): Observable<EntityResponseType> {
    return this.http.post<IVentas>(ROOT_URL + 'Ventas', venta, { observe: 'response' });
  }
  update(venta: IVentas): Observable<EntityResponseType> {
    return this.http.put<IVentas>(ROOT_URL + 'Ventas/2', venta, { observe: 'response' });
  }
  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(ROOT_URL+ 'Ventas/'+id, { observe: 'response' });
  }

  getSales(){
    return this.http.get<IVentas[]>(ROOT_URL + 'Ventas');  
  }
 
}
