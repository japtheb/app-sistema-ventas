export interface IClient {
    Id_Cliente?: number;
    Id_Tipo_Documento?: number;
    Documento?: string;
    Nombre?: string;
    Apellido?: string;
    Telefono?: string;
  }
  
  export class Client implements IClient {
    constructor(
      public Id_Cliente?: number,
      public Id_Tipo_Documento?: number,
      public Documento?: string,
      public Nombre?: string,
      public Apellido?: string,
      public Telefono?: string
    ) {}
  }
  