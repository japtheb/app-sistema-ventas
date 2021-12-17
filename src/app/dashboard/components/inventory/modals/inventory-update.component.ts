import { Component, Input, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { InventoryService } from '../inventory.service';
import { Inventory, IInventory } from 'src/app/dashboard/models/inventario.model';
import { IProducto } from 'src/app/dashboard/models/productos.model';
import { ProductsService } from '../../products/products.service';

@Component({
    selector: 'inventory-update',
    templateUrl: './inventory-update.component.html',
})
export class UpdateInventoryComponent implements OnInit {
    @Input() public data?: IInventory;
    isSaving = false;
    lstProductos: IProducto[] | null = null;
    editForm = this.fb.group({
        Id_Inventario:[],
        producto: [null, [Validators.required]],
        cantidad: [null, [Validators.required]]
    });
    
    constructor(
        protected productService: ProductsService, 
        protected inventoryService: InventoryService,
        protected activatedRoute: ActivatedRoute,
        private fb: FormBuilder,
        public activeModal: NgbActiveModal
    ) {}
    
    ngOnInit(): void {
        this.productService.getProducts().subscribe((resp) => {
            this.lstProductos = resp;
        });
        this.activatedRoute.data.subscribe(({ client }) => {
            this.updateForm(this.data ? this.data : client);
        });
    }
    updateForm(inventory: Inventory): void {
        this.editForm.patchValue({
          Id_Inventario: inventory.Id_Inventario,
          producto: inventory.Id_Producto,
          cantidad:inventory.Cantidad_Producto
        });
      }
    previousState(): void {
        this.activeModal.dismiss();
    }
    save(): void {
        this.isSaving = true;
        const inventory = this.createFromForm();
        if (inventory.Id_Inventario !== undefined) {
            this.subscribeToSaveResponse(this.inventoryService.update(inventory));
        } else {
            this.subscribeToSaveResponse(this.inventoryService.create(inventory));
        }
    }
    private createFromForm(): Inventory {
        return {
          ...new Inventory(),
          Id_Inventario: this.editForm.get(['Id_Inventario'])!.value,
          Id_Producto: this.editForm.get(['producto'])!.value,
          Cantidad_Producto: this.editForm.get(['cantidad'])!.value
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
