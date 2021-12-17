import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IVentas } from '../../models/ventas.model'
import { SalesService } from './sales.service';
import { CreateSaleComponent } from './modals/sales-create.component';
@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {
  sales!: IVentas[];
  NoDataFound:boolean= false;
  displayedColumns: string[] = ['position', 'Cliente', 'Producto', 'Cantidad_Vendida', 'Valor_total'];

  constructor(
    protected salesService:SalesService, 
    private route: Router,
    protected modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.LoadData();  
  }
  LoadData():void {
    this.salesService.getSales().subscribe((resp) => {
      this.sales = resp;
      if(this.sales.length == 0){
        this.NoDataFound = true;
      }
      console.log(this.sales);
    });
  }
  AddSale():void{
    const modalRef = this.modalService.open(CreateSaleComponent, { size: 'lg', backdrop: 'static' });
    modalRef.result.then(
      data => {
      },
      reason => {
        this.LoadData();
      }
    );
  }
}
