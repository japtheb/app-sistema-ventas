import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateProductComponent } from '../products/modals/products-create.component';
import { InventoryService } from '../inventory/inventory.service';
import { IInventory } from '../../models/inventario.model'
import { InventoryDeleteDialogComponent } from './modals/inventory-delete.component';
import { CreateInventoryComponent } from './modals/inventory-create.component';
import { UpdateInventoryComponent } from './modals/inventory-update.component';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
  inventory!: IInventory[];
  NoDataFound:boolean= false;
  displayedColumns: string[] = ['position', 'Nombre_Producto', 'Valor_Unidad' ,'Cantidad_disponible','editar','Eliminar'];

  constructor(
    protected inventoryService: InventoryService, 
    private route: Router,
    protected modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.LoadData();
  }
  AddInventory():void{
    const modalRef = this.modalService.open(CreateInventoryComponent, { size: 'lg', backdrop: 'static' });
    modalRef.result.then(
      data => {
      },
      reason => {
        this.LoadData();
      }
    );
  }
  LoadData():void {
    this.inventoryService.getInventory().subscribe((resp) => {
      this.inventory = resp;
      if(this.inventory.length == 0){
        this.NoDataFound = true;
      }
      console.log(this.inventory);
    });
  }
  delete(inventory: IInventory): void {
    const modalRef = this.modalService.open( InventoryDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.data = inventory;
    modalRef.result.then(
      data => {},
      reason => {
        this.LoadData();
      }
    );
  }
  update(inventory: IInventory): void {
    const modalRef = this.modalService.open(UpdateInventoryComponent,  { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.data = inventory;
    modalRef.result.then(
      data => {},
      reason => {
        this.LoadData();
      }
    ); 
  }
}
