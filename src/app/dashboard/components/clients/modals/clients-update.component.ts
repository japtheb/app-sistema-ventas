import { Component, Input, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientsService } from '../clients.service';
import { Client, IClient } from 'src/app/dashboard/models/clients.models';
import { ITipos_documentos } from '../../../models/tipos_documento.model';

@Component({
    selector: 'clients-update',
    templateUrl: './clients-update.component.html',
})
export class UpdateClientComponent implements OnInit {
    @Input() public data?: IClient;
    isSaving = false;
    lstTipos: ITipos_documentos[] | null = null;
    editForm = this.fb.group({
        Id_Cliente:[],
        nombre: [null, [Validators.required]],
        apellido: [null, [Validators.required]],
        tipoDocumento: [null, [Validators.required]],
        documento: [null, [Validators.required]],
        telefono: [null, [Validators.required]],
    });
    
    constructor(
        protected clientsService: ClientsService,
        protected activatedRoute: ActivatedRoute,
        private fb: FormBuilder,
        public activeModal: NgbActiveModal
    ) {}
    
    ngOnInit(): void {
        this.clientsService.getdocuments().subscribe(res => {
            this.lstTipos = res;
        });
        this.activatedRoute.data.subscribe(({ client }) => {
            this.updateForm(this.data ? this.data : client);
        });
    }
    updateForm(client: Client): void {
        this.editForm.patchValue({
          Id_Cliente: client.Id_Cliente,
          nombre: client.Nombre,
          apellido:client.Apellido,
          tipoDocumento:client.Id_Tipo_Documento,
          documento:client.Documento,
          telefono:client.Telefono      
        });
      }
    previousState(): void {
        this.activeModal.dismiss();
    }
    save(): void {
        this.isSaving = true;
        const client = this.createFromForm();
        if (client.Id_Cliente !== undefined) {
            this.subscribeToSaveResponse(this.clientsService.update(client));
        } else {
            this.subscribeToSaveResponse(this.clientsService.create(client));
        }
        console.log("listo");
    }
    private createFromForm(): Client {
        return {
          ...new Client(),
          Id_Cliente: this.editForm.get(['Id_Cliente'])!.value,
          Nombre: this.editForm.get(['nombre'])!.value.trim(),
          Apellido: this.editForm.get(['apellido'])!.value.trim(),
          Id_Tipo_Documento: this.editForm.get(['tipoDocumento'])!.value,
          Documento: this.editForm.get(['documento'])!.value.trim(),
          Telefono: this.editForm.get(['telefono'])!.value.trim(),
        };
    }
    protected subscribeToSaveResponse(result: Observable<HttpResponse<IClient>>): void {
        result.subscribe(
          () => this.onSaveSuccess(),
          () => this.onSaveError()
        );
      }
    
    protected onSaveSuccess(): void {
        this.isSaving = false;
        this.activeModal.dismiss();
    }
    
    protected onSaveError(): void {
        this.isSaving = false;
    }
}
