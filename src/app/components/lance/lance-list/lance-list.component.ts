import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/resources/services/alert.service';
import { LancesService } from 'src/app/resources/services/lances.service';
import { Lance } from '../Lance';

@Component({
  selector: 'app-lance-list',
  templateUrl: './lance-list.component.html',
  styleUrls: ['./lance-list.component.css'],
  providers: [{ provide: "Window", useValue: window }]
})
export class LanceListComponent implements OnInit {

  lance: Lance[] = [];
  lanceSelecionado: Lance = null;
  mensagemSucesso: string;
  mensagemErro: string;

  displayedColumns: string[] = [
    "id",
    "nome",
    "site",
    "acoes",
  ];
  dataSource: MatTableDataSource<Lance> = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) matSort: MatSort;

  constructor(
    private service: LancesService,
    private router: Router,
    private alertService: AlertService,
    @Inject("Window") private window: Window
  ) {}

  ngOnInit(): void {
    this.service.getLance().subscribe((response) => {
      this.lance = response;
      this.dataSource = new MatTableDataSource<Lance>(this.lance);
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
    this.router.navigate(["/oferta-form"]);
  }
  preparaDelecao(lance: Lance) {
    this.lanceSelecionado = lance;
  }

  deletarOferta() {
    this.service.deletar(this.lanceSelecionado).subscribe(
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
