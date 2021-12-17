import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IInventory } from '../../../models/inventario.model';
import { InventoryService } from '../inventory.service';

@Component({
  templateUrl: './inventory-delete.component.html',
})
export class InventoryDeleteDialogComponent {
    @Input() public data?: IInventory;
    inventory?: IInventory;
    constructor(
        protected inventoryService: InventoryService,
        public activeModal: NgbActiveModal,
    ) {}

    ngOnInit(): void {
        this.inventory = this.data ? this.data : this.inventory;
      }
    
    cancel(): void {
        this.activeModal.dismiss();
    }
    confirmDelete(id: number): void {
        this.inventoryService.delete(id).subscribe(() => {
          this.activeModal.dismiss();
        });
    }
}