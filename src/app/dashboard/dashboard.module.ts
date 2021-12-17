import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashBoardRoutingModule } from './dashboard.routing.module';
import { WrapperComponent } from './components/wrapper/wrapper.component'
import { DashboardComponent } from './components/dashboard/dashboard.component'
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { ClientsComponent } from './components/clients/clients.component';
import { SalesComponent } from './components/sales/sales.component';
import { ProductsComponent } from './components/products/products.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { MatTableModule} from '@angular/material/table';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CreateClientComponent } from './components/clients/modals/clients-create.component';
import { ClientDeleteDialogComponent } from './components/clients/modals/clients-delete.component';
import { UpdateClientComponent } from './components/clients/modals/clients-update.component';
import { CreateProductComponent } from './components/products/modals/products-create.component';
import { ProductDeleteDialogComponent } from './components/products/modals/products-delete.component';
import { UpdateProductComponent } from './components/products/modals/products-update.component';
import { InventoryDeleteDialogComponent } from './components/inventory/modals/inventory-delete.component';
import { CreateInventoryComponent } from './components/inventory/modals/inventory-create.component';
import { CreateSaleComponent } from './components/sales/modals/sales-create.component';
import { UpdateInventoryComponent } from './components/inventory/modals/inventory-update.component';


@NgModule({
  declarations: [
    DashboardComponent,
    WrapperComponent,
    ClientsComponent,
    SalesComponent,
    ProductsComponent,
    InventoryComponent,
    CreateClientComponent,
    ClientDeleteDialogComponent,
    UpdateClientComponent,
    CreateProductComponent,
    ProductDeleteDialogComponent,
    UpdateProductComponent,
    InventoryDeleteDialogComponent,
    CreateInventoryComponent,
    CreateSaleComponent,
    UpdateInventoryComponent
    
  ],
  imports: [
    CommonModule,
    DashBoardRoutingModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatButtonModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
