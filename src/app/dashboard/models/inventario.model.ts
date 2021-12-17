export interface IInventory {
    Id_Inventario?: number;
    Id_Producto?: string;
    Cantidad_Producto?: string;
  }
  
  export class Inventory implements IInventory {
    constructor(
      public Id_Inventario?: number,
      public Id_Producto?: string,
      public Cantidad_Producto?: string
      
    ) {}
  }
  