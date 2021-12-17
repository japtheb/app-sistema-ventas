import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IInventory } from '../../models/inventario.model';
import { ROOT_URL } from '../../../config';
import { Observable } from 'rxjs';  

type EntityResponseType = HttpResponse<IInventory>;
@Injectable({ providedIn: 'root'})
export class InventoryService {

  constructor(private http: HttpClient) { }  
  create(inventory: IInventory): Observable<EntityResponseType> {
    return this.http.post<IInventory>(ROOT_URL + 'Inventarios', inventory, { observe: 'response' });
  }
  update(inventory: IInventory): Observable<EntityResponseType> {
    return this.http.put<IInventory>(ROOT_URL + 'Inventarios/'+inventory.Id_Inventario, inventory, { observe: 'response' });
  }
  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(ROOT_URL+ 'Inventarios/'+id, { observe: 'response' });
  }

  getInventory(){
    return this.http.get<IInventory[]>(ROOT_URL + 'Inventarios');  
  }
}
