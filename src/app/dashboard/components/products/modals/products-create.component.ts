import { Component, Input, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductsService } from '../products.service';
import { Producto, IProducto } from 'src/app/dashboard/models/productos.model';

@Component({
    selector: 'products-create',
    templateUrl: './products-create.component.html',
})
export class CreateProductComponent implements OnInit {
    isSaving = false;
    createForm = this.fb.group({
        Id:[],
        nombre: [null, [Validators.required]],
        valor: [null, [Validators.required]],
    });
    ngOnInit(): void {
    }
    constructor(
        protected productsService: ProductsService,
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
        this.subscribeToSaveResponse(this.productsService.create(client));
        console.log("listo");
    }
    private createFromForm(): IProducto {
        return {
          ...new Producto(),
          Nombre_Producto: this.createForm.get(['nombre'])!.value.trim(),
          Valor_Unidad: this.createForm.get(['valor'])!.value.trim(),
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
