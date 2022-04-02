import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/resources/services/alert.service';
import { OfertasService } from 'src/app/resources/services/ofertas.service';
import { Oferta } from '../Oferta';

@Component({
  selector: 'app-oferta-list',
  templateUrl: './oferta-list.component.html',
  styleUrls: ['./oferta-list.component.css'],
  providers: [{ provide: "Window", useValue: window }]
})
export class OfertaListComponent implements OnInit {
  oferta: Oferta[] = [];
  ofertaSelecionada: Oferta = null;
  mensagemSucesso: string;
  mensagemErro: string;

  displayedColumns: string[] = [
    "id",
    "nome",
    "site",
    "acoes",
  ];
  dataSource: MatTableDataSource<Oferta> = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) matSort: MatSort;

  constructor(
    private service: OfertasService,
    private router: Router,
    private alertService: AlertService,
    @Inject("Window") private window: Window
  ) {}

  ngOnInit(): void {
    this.service.getOferta().subscribe((response) => {
      this.oferta = response;
      this.dataSource = new MatTableDataSource<Oferta>(this.oferta);
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
  preparaDelecao(oferta: Oferta) {
    this.ofertaSelecionada = oferta;
  }

  deletarOferta() {
    this.service.deletar(this.ofertaSelecionada).subscribe(
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
