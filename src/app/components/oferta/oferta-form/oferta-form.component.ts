import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertService } from 'src/app/resources/services/alert.service';
import { OfertasService } from 'src/app/resources/services/ofertas.service';
import { Oferta } from '../Oferta';

@Component({
  selector: 'app-oferta-form',
  templateUrl: './oferta-form.component.html',
  styleUrls: ['./oferta-form.component.css']
})
export class OfertaFormComponent implements OnInit {

  ofertaForm: FormGroup;
  oferta: Oferta;
  colorSituacao: string;
  Validators: any;
  id: number = 0;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private ofertasService: OfertasService,
    private alertService: AlertService
  ) { 
    this.oferta = new Oferta();
  }

  ngOnInit(): void {
    if( this.id === 0) {
      let params: Observable<any> = this.activeRoute.params;
    params.subscribe((urlParams) => {
      this.id = urlParams["id"];
      if (this.id) {
        this.ofertasService.getOfertaById(this.id).subscribe(response => {
          this.oferta = response;
        });
      }
    });
    }
    this.configurarFormulario();
  }

  configurarFormulario() {
    this.ofertaForm = this.formBuilder.group({
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
      this.ofertasService
      .atualizar(this.oferta)
      .subscribe(response => {
        this.alertService.success('Maravilha', 'Oferta atualizada com sucesso');
      }, errorResponse => {
        this.alertService.info('error', 'Erro ao atualizar a oferta!');
      })

    }else {
    this.ofertasService
      .salvar(this.oferta)
      .subscribe( (data) => {
        this.alertService.success('Ótimo', 'Oferta criado com sucesso!');
      }, (errorResponse) => {
        this.alertService.error(errorResponse.error.message);
        })
    }
  }

  voltarParaListagem() {
    this.router.navigate(["layout"]);
  }
}
