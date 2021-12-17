import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IProducto } from '../../../models/productos.model';
import { ProductsService } from '../products.service';

@Component({
  templateUrl: './products-delete.component.html',
})
export class ProductDeleteDialogComponent {
    @Input() public data?: IProducto;
    product?: IProducto;
    constructor(
        protected productService: ProductsService,
        public activeModal: NgbActiveModal,
    ) {}

    ngOnInit(): void {
        this.product = this.data ? this.data : this.product;
      }
    
    cancel(): void {
        this.activeModal.dismiss();
    }
    confirmDelete(id: number): void {
        this.productService.delete(id).subscribe(() => {
          this.activeModal.dismiss();
        });
    }
}