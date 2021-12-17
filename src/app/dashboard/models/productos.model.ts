export interface IProducto {
    Id_Producto?: number;
    Nombre_Producto?: string;
    Valor_Unidad?: number;
  }
  
  export class Producto implements IProducto {
    constructor(
      public Id_Producto?: number,
      public Nombre_Producto?: string,
      public Valor_Unidad?: number
      
    ) {}
  }
  