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
    selector: 'clients-create',
    templateUrl: './clients-create.component.html',
})
export class CreateClientComponent implements OnInit {
    isSaving = false;
    lstTipos: ITipos_documentos[] | null = null;
    createForm = this.fb.group({
        Id:[],
        nombre: [null, [Validators.required]],
        apellido: [null, [Validators.required]],
        tipoDocumento: [null, [Validators.required]],
        documento: [null, [Validators.required]],
        telefono: [null, [Validators.required]],
    });
    ngOnInit(): void {
        this.clientsService.getdocuments().subscribe(res => {
            this.lstTipos = res;
        });
    }
    constructor(
        protected clientsService: ClientsService,
        protected activatedRoute: ActivatedRoute,
        private fb: FormBuilder,
        public activeModal: NgbActiveModal
    ) {}
    previousState(): void {
        this.activeModal.dismiss();
    }
    save(): void {
        this.isSaving = true;
        const client = this.createFromForm();
        this.subscribeToSaveResponse(this.clientsService.create(client));
        console.log("listo");
    }
    private createFromForm(): Client {
        return {
          ...new Client(),
          Nombre: this.createForm.get(['nombre'])!.value.trim(),
          Apellido: this.createForm.get(['apellido'])!.value.trim(),
          Id_Tipo_Documento: parseInt(this.createForm.get(['tipoDocumento'])!.value.trim()),
          Documento: this.createForm.get(['documento'])!.value.trim(),
          Telefono: this.createForm.get(['telefono'])!.value.trim(),
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
