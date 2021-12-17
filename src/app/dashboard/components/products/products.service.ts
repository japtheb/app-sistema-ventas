import { Injectable } from '@angular/core';
import { ROOT_URL } from '../../../config';
import { Observable } from 'rxjs';  
import { HttpClient, HttpParams, HttpHeaders, HttpResponse } from '@angular/common/http';  
import {IProducto,Producto } from '../../models/productos.model';

type EntityResponseType = HttpResponse<IProducto>;
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private http: HttpClient) { }  
  
  create(producto: IProducto): Observable<EntityResponseType> {
    return this.http.post<IProducto>(ROOT_URL + 'Productos', producto, { observe: 'response' });
  }
  update(producto: IProducto): Observable<EntityResponseType> {
    return this.http.put<IProducto>(ROOT_URL + 'Productos/'+producto.Id_Producto, producto, { observe: 'response' });
  }
  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(ROOT_URL+ 'Productos/'+id, { observe: 'response' });
  }
  getProducts(){
    return this.http.get<IProducto[]>(ROOT_URL + 'Productos');  
  }
}
