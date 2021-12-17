import { Component, Input, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { InventoryService } from '../inventory.service';
import { Inventory, IInventory } from 'src/app/dashboard/models/inventario.model';
import { IProducto } from '../../../models/productos.model';
import { ProductsService } from '../../products/products.service';

@Component({
    selector: 'inventory-create',
    templateUrl: './inventory-create.component.html',
})
export class CreateInventoryComponent implements OnInit {
    isSaving = false;
    lstProductos: IProducto[] | null = null;
    createForm = this.fb.group({
        Id:[],
        producto: [null, [Validators.required]],
        cantidad: [null, [Validators.required]]
    });
    ngOnInit(): void {
        this.productService.getProducts().subscribe((resp) => {
            this.lstProductos = resp;
        });
        
    }
    constructor(
        protected productService: ProductsService, 
        protected inventoryService: InventoryService,
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
        this.subscribeToSaveResponse(this.inventoryService.create(client));
        console.log("listo");
    }
    private createFromForm(): Inventory {
        return {
          ...new Inventory(),
          Id_Producto: this.createForm.get(['producto'])!.value,
          Cantidad_Producto: this.createForm.get(['cantidad'])!.value
        };
    }
    protected subscribeToSaveResponse(result: Observable<HttpResponse<IInventory>>): void {
        result.subscribe(
          () => this.onSaveSuccess(),
          () => this.onSaveError()
        );
      }
    
    protected onSaveSuccess(): void {
        this.isSaving = false;
        this.activeModal.dismiss();
    }
    
    protected onSaveError(): void {
        this.isSaving = false;
    }
}
