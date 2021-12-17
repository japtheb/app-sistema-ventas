import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { WrapperComponent } from './components/wrapper/wrapper.component';
import { ClientsComponent } from './components/clients/clients.component';
import { SalesComponent } from './components/sales/sales.component';
import { ProductsComponent } from './components/products/products.component';
import { InventoryComponent } from './components/inventory/inventory.component';

const routes: Routes = [
  {
    path:'',
    component:WrapperComponent,
    children:[
        {
            path:'dashboard',
            component:DashboardComponent
        },
        {
            path:'clientes',
            component:ClientsComponent
        },
        {
            path:'ventas',
            component:SalesComponent
        },
        {
            path:'productos',
            component:ProductsComponent
        },
        {
            path:'inventario',
            component:InventoryComponent
        },
    ]
  },
  {
      path:'**',
      redirectTo:'/dashboard',
      pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashBoardRoutingModule { }
