import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IClient } from '../../../models/clients.models';
import { ClientsService } from '../clients.service';

@Component({
  templateUrl: './clients-delete.component.html',
})
export class ClientDeleteDialogComponent {
    @Input() public data?: IClient;
    client?: IClient;
    constructor(
        protected clientService: ClientsService,
        public activeModal: NgbActiveModal,
    ) {}

    ngOnInit(): void {
        this.client = this.data ? this.data : this.client;
      }
    
    cancel(): void {
        this.activeModal.dismiss();
    }
    confirmDelete(id: number): void {
        this.clientService.delete(id).subscribe(() => {
          this.activeModal.dismiss();
        });
    }
}