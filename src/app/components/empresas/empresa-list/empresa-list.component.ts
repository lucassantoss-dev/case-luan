import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/resources/services/alert.service';
import { EmpresasService } from 'src/app/resources/services/empresas.service';
import { Cliente } from '../../cliente/Cliente';
import { Empresa } from '../Empresa';

@Component({
  selector: 'app-empresa-list',
  templateUrl: './empresa-list.component.html',
  styleUrls: ['./empresa-list.component.css'],
  providers: [{ provide: "Window", useValue: window }],
})
export class EmpresaListComponent implements OnInit {

  empresa: Empresa[] = [];
  empresaSelecionada: Empresa = null;
  mensagemSucesso: string;
  mensagemErro: string;

  displayedColumns: string[] = [
    "id",
    "nome",
    "site",
    "acoes",
  ];
  dataSource: MatTableDataSource<Cliente> = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) matSort: MatSort;

  constructor(
    private service: EmpresasService,
    private router: Router,
    private alertService: AlertService,
    @Inject("Window") private window: Window
  ) {}

  ngOnInit(): void {
    this.service.getEmpresa().subscribe((response) => {
      this.empresa = response;
      this.dataSource = new MatTableDataSource<Cliente>(this.empresa);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.matSort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  novoCadastro() {
    this.router.navigate(["/empresa-form"]);
  }
  preparaDelecao(cliente: Cliente) {
    this.empresaSelecionada = cliente;
  }

  deletarCliente() {
    this.service.deletar(this.empresaSelecionada).subscribe(
      (response) => {
        this.alertService.success(
          "Opa",
          "Você optou por excluir esse cliente!"
        );
        this.ngOnInit();
      },
      (errorResponse) => {
        this.alertService.error(errorResponse.error.message);
      }
    );
  }
}
