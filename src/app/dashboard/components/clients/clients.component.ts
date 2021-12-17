import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientsService } from './clients.service';
import { IClient } from '../../models/clients.models'
import { NgbModal, NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';
import { CreateClientComponent } from './modals/clients-create.component'
import { ClientDeleteDialogComponent } from './modals/clients-delete.component';
import { UpdateClientComponent } from './modals/clients-update.component';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  clients!: IClient[];
  displayedColumns: string[] = ['position', 'Tipo_Documento', 'Documento', 'Nombre','Apellido', 'Telefono','editar','Eliminar'];
  NoDataFound:boolean= false;
  constructor(
    protected clientService:ClientsService, 
    private route: Router,
    protected modalService: NgbModal,
  ) { }

  ngOnInit(): void {
   this.LoadData();  
  }
  LoadData():void {
    this.clientService.getClients().subscribe((resp) => {
      this.clients = resp;
      if(this.clients.length == 0){
        this.NoDataFound = true;
      }
      console.log(this.clients);
    });
  }
  AddClient():void{
    const modalRef = this.modalService.open(CreateClientComponent, { size: 'lg', backdrop: 'static' });
    modalRef.result.then(
      data => {
      },
      reason => {
        this.LoadData();
      }
    );
  }
  update(client: IClient): void {
    const modalRef = this.modalService.open( UpdateClientComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.data = client;
    modalRef.result.then(
      data => {},
      reason => {
        this.LoadData();
      }
    ); 
  }
  delete(client: IClient): void {
    const modalRef = this.modalService.open( ClientDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.data = client;
    modalRef.result.then(
      data => {},
      reason => {
        this.LoadData();
      }
    );
  }
}
