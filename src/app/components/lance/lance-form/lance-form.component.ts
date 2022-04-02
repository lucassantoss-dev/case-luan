import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertService } from 'src/app/resources/services/alert.service';
import { LancesService } from 'src/app/resources/services/lances.service';
import { Lance } from '../Lance';

@Component({
  selector: 'app-lance-form',
  templateUrl: './lance-form.component.html',
  styleUrls: ['./lance-form.component.css']
})
export class LanceFormComponent implements OnInit {

  lanceForm: FormGroup;
  lance: Lance;
  colorSituacao: string;
  Validators: any;
  id: number = 0;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private lancesService: LancesService,
    private alertService: AlertService
  ) { 
    this.lance = new Lance();
  }

  ngOnInit(): void {
    if( this.id === 0) {
      let params: Observable<any> = this.activeRoute.params;
    params.subscribe((urlParams) => {
      this.id = urlParams["id"];
      if (this.id) {
        this.lancesService.getLanceById(this.id).subscribe(response => {
          this.lance = response;
        });
      }
    });
    }
    this.configurarFormulario();
  }

  configurarFormulario() {
    this.lanceForm = this.formBuilder.group({
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
      this.lancesService
      .atualizar(this.lance)
      .subscribe(response => {
        this.alertService.success('Maravilha', 'Oferta atualizada com sucesso');
      }, errorResponse => {
        this.alertService.info('error', 'Erro ao atualizar a oferta!');
      })

    }else {
    this.lancesService
      .salvar(this.lance)
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
