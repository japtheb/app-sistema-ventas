export interface ITipos_documentos {
    Id?: number;
    codigo?: string;
    valor?: string;
  }
  
  export class Tipos_documentos implements ITipos_documentos {
    constructor(
      public Id: number,
      public codigo?: string,
      public valor?: string
      
    ) {}
  }
  