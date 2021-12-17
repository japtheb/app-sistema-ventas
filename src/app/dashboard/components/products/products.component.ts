import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IProducto } from '../../models/productos.model';
import { CreateProductComponent } from './modals/products-create.component';
import { ProductDeleteDialogComponent } from './modals/products-delete.component';
import { UpdateProductComponent } from './modals/products-update.component';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products!: IProducto[];
  displayedColumns: string[] = ['position', 'Nombre_Producto', 'Valor_Unidad','editar','Eliminar'];
  NoDataFound:boolean= false;
  constructor(
    protected productService: ProductsService, 
    private route: Router,
    protected modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.LoadData();  
  }
  LoadData():void {
    this.productService.getProducts().subscribe((resp) => {
      this.products = resp;
      if(this.products.length == 0){
        this.NoDataFound = true;
      }
    });
  }
  AddProduct():void{
    const modalRef = this.modalService.open(CreateProductComponent, { size: 'lg', backdrop: 'static' });
    modalRef.result.then(
      data => {
      },
      reason => {
        this.LoadData();
      }
    );
  }
  
  delete(product: IProducto): void {
    const modalRef = this.modalService.open( ProductDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.data = product;
    modalRef.result.then(
      data => {},
      reason => {
        this.LoadData();
      }
    );
  }
  update(product: IProducto): void {
    const modalRef = this.modalService.open( UpdateProductComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.data = product;
    modalRef.result.then(
      data => {},
      reason => {
        this.LoadData();
      }
    ); 
  }
}
