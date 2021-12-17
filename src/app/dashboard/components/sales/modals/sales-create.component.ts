import { Component, Input, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SalesService } from '../sales.service';
import { Ventas, IVentas } from 'src/app/dashboard/models/ventas.model';
import { Producto, IProducto } from 'src/app/dashboard/models/productos.model';
import { ProductsService } from '../../products/products.service';
import { IClient } from 'src/app/dashboard/models/clients.models';
import { ClientsService } from '../../clients/clients.service';
import { InventoryService } from '../../inventory/inventory.service';
import { IInventory, Inventory } from 'src/app/dashboard/models/inventario.model';

@Component({
    selector: 'sales-create',
    templateUrl: './sales-create.component.html',
})
export class CreateSaleComponent implements OnInit {
    isSaving = false;
    lstProductos: IProducto[] | null = null;
    lstClients: IClient[] | null = null;
    lstInventory: IInventory[] | null = null;
    productFilter: any[] | undefined = [];
    createForm = this.fb.group({
        Id:[],
        nombreCliente: [null, [Validators.required]],
        producto: [null, [Validators.required]],
        cantidad: [null, [Validators.required]],
        valorTotal: [null, [Validators.required]]
    });
    ngOnInit(): void {
        this.productService.getProducts().subscribe((resp) => {
            this.lstProductos = resp;
        });
        this.clientService.getClients().subscribe((resp) => {
            this.lstClients = resp;
        });
        this.inventoryService.getInventory().subscribe((resp) => {
            this.lstInventory = resp;
        });
    }
    constructor(
        protected productService: ProductsService, 
        protected inventoryService: InventoryService,
        protected clientService:ClientsService, 
        protected salesService: SalesService,
        protected activatedRoute: ActivatedRoute,
        private fb: FormBuilder,
        public activeModal: NgbActiveModal
    ) {}
    previousState(): void {
        this.activeModal.dismiss();
    }
    save(): void {
        this.isSaving = true;
        const client = this.createFromForm();
        this.subscribeToSaveResponse(this.salesService.create(client));
        console.log("listo");
    }
    private createFromForm(): Ventas {
        return {
          ...new Ventas(),
          Id_Cliente: this.createForm.get(['nombreCliente'])!.value,
          Id_Producto: this.createForm.get(['producto'])!.value,
          Cantidad_Venta: this.createForm.get(['cantidad'])!.value,
          Valor_Total: this.createForm.get(['valorTotal'])!.value,
        };
    }
    protected subscribeToSaveResponse(result: Observable<HttpResponse<IVentas>>): void {
        result.subscribe(
          () => this.onSaveSuccess(),
          () => this.onSaveError()
        );
    }
    
    protected onSaveSuccess(): void {
        this.isSaving = false;
        this.productFilter = this.lstInventory?.filter(m => m.Id_Producto == this.createForm.get(['producto'])!.value);
        let cantidadVendida = this.createForm.get(['cantidad'])!.value;
        this.productFilter![0].Cantidad_Producto = (this.productFilter![0].Cantidad_Producto - cantidadVendida)
        console.log(this.productFilter);
        const inventory = this.createFromFormInventory();
        this.subscribeToSaveResponseInve(this.inventoryService.update(inventory));
    }
    private createFromFormInventory(): Inventory {
        return {
          ...new Inventory(),
          Id_Inventario: this.productFilter![0].Id_Inventario,
          Id_Producto: this.productFilter![0].Id_Producto,
          Cantidad_Producto: this.productFilter![0].Cantidad_Producto,
        };
    }

    protected onSaveError(): void {
        this.isSaving = false;
    }
    public calculatedPrice():void{
        let cantidad = this.createForm.get(['cantidad'])!.value;
        let producto = this.createForm.get(['producto'])!.value;
        let valorUni = this.lstProductos!.filter(m => m.Id_Producto == producto);
        let valorTotal = (valorUni[0].Valor_Unidad! *cantidad);
        this.createForm.patchValue({
            valorTotal:valorTotal
        });
    }
    protected subscribeToSaveResponseInve(result: Observable<HttpResponse<IInventory>>): void {
        result.subscribe(
          () => this.onSaveSuccess2(),
          () => this.onSaveError()
        );
    }
    protected onSaveSuccess2(): void {
        this.isSaving = false;
        this.activeModal.dismiss();
    }
}
