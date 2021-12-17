import { Component, Input, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductsService } from '../products.service';
import { Producto, IProducto } from 'src/app/dashboard/models/productos.model';

@Component({
    selector: 'products-update',
    templateUrl: './products-update.component.html',
})
export class UpdateProductComponent implements OnInit {
    @Input() public data?: IProducto;
    isSaving = false;

    editForm = this.fb.group({
        Id_Producto:[],
        nombre: [null, [Validators.required]],
        valor: [null, [Validators.required]],
    });
    
    constructor(
        protected productsService: ProductsService,
        protected activatedRoute: ActivatedRoute,
        private fb: FormBuilder,
        public activeModal: NgbActiveModal
    ) {}
    
    ngOnInit(): void {
        this.activatedRoute.data.subscribe(({ product }) => {
            this.updateForm(this.data ? this.data : product);
        });
    }
    updateForm(product: Producto): void {
        this.editForm.patchValue({
          Id_Producto: product.Id_Producto,
          nombre: product.Nombre_Producto,
          valor:product.Valor_Unidad
        });
      }
    previousState(): void {
        this.activeModal.dismiss();
    }
    save(): void {
        this.isSaving = true;
        const product = this.createFromForm();
        if (product.Id_Producto !== undefined) {
            this.subscribeToSaveResponse(this.productsService.update(product));
        } else {
            this.subscribeToSaveResponse(this.productsService.create(product));
        }
        console.log("listo");
    }
    private createFromForm(): Producto {
        return {
          ...new Producto(),
          Id_Producto: this.editForm.get(['Id_Producto'])!.value,
          Nombre_Producto: this.editForm.get(['nombre'])!.value.trim(),
          Valor_Unidad: this.editForm.get(['valor'])!.value,
          
        };
    }
    protected subscribeToSaveResponse(result: Observable<HttpResponse<IProducto>>): void {
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
