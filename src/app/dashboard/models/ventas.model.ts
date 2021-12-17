export interface IVentas {
    Id_Venta?: number;
    Id_Cliente?: number;
    Id_Producto?: number;
    Cantidad_Venta?: number;
    Valor_Total?: number;
  }
  
  export class Ventas implements IVentas {
    constructor(
      public Id_Venta?: number,
      public Id_Cliente?: number,
      public Id_Producto?: number,
      public Cantidad_Venta?: number,
      public Valor_Total?: number
      
    ) {}
  }
  