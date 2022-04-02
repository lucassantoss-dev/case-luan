import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSlideToggleChange } from "@angular/material/slide-toggle";
import { Cliente } from '../Cliente';
import { ClienteService } from 'src/app/resources/services/cliente.service';
import { AlertService } from 'src/app/resources/services/alert.service';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css']
})
export class ClienteFormComponent implements OnInit {

  clienteForm: FormGroup;
  cliente: Cliente;
  colorSituacao: string;
  Validators: any;
  id: number = 0;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private alertService: AlertService
  ) { 
    this.cliente = new Cliente();
  }

  ngOnInit(): void {
    if( this.id === 0) {
      let params: Observable<any> = this.activeRoute.params;
    params.subscribe((urlParams) => {
      this.id = urlParams["id"];
      if (this.id) {
        this.clienteService.getClienteById(this.id).subscribe(response => {
          this.cliente = response;
        });
      }
    });
    }
    this.configurarFormulario();
  }

  configurarFormulario() {
    this.clienteForm = this.formBuilder.group({
      nome: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ]
    })
  }    
  salvar() {
    this.configurarFormulario();
    if(this.id){
      this.clienteService
      .atualizar(this.cliente)
      .subscribe(response => {
        this.alertService.success('Maravilha', 'Cliente atualizado com sucesso');
      }, errorResponse => {
        this.alertService.info('error', 'Erro ao atualizar o cliente!');
      })

    }else {
    this.clienteService
      .salvar(this.cliente)
      .subscribe( (data) => {
        this.alertService.success('Ótimo', 'Cliente criado com sucesso!');
      }, (errorResponse) => {
        this.alertService.error(errorResponse.error.message);
        })
    }
  }

  voltarParaListagem() {
    this.router.navigate(["layout"]);
  }

}
