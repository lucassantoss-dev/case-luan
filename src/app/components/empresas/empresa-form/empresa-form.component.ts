import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertService } from 'src/app/resources/services/alert.service';
import { EmpresasService } from 'src/app/resources/services/empresas.service';
import { Empresa } from '../Empresa';

@Component({
  selector: 'app-empresa-form',
  templateUrl: './empresa-form.component.html',
  styleUrls: ['./empresa-form.component.css']
})
export class EmpresaFormComponent implements OnInit {

  empresaForm: FormGroup;
  empresa: Empresa;
  colorSituacao: string;
  Validators: any;
  id: number = 0;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private empresaService: EmpresasService,
    private alertService: AlertService
  ) { 
    this.empresa = new Empresa();
  }

  ngOnInit(): void {
    if( this.id === 0) {
      let params: Observable<any> = this.activeRoute.params;
    params.subscribe((urlParams) => {
      this.id = urlParams["id"];
      if (this.id) {
        this.empresaService.getEmpresaById(this.id).subscribe(response => {
          this.empresa = response;
        });
      }
    });
    }
    this.configurarFormulario();
  }

  configurarFormulario() {
    this.empresaForm = this.formBuilder.group({
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
      this.empresaService
      .atualizar(this.empresa)
      .subscribe(response => {
        this.alertService.success('Maravilha', 'Cliente atualizado com sucesso');
      }, errorResponse => {
        this.alertService.info('error', 'Erro ao atualizar o cliente!');
      })

    }else {
    this.empresaService
      .salvar(this.empresa)
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
