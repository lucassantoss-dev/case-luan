import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfertaFormComponent } from './oferta-form/oferta-form.component';
import { OfertaListComponent } from './oferta-list/oferta-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxMaskModule } from 'ngx-mask';



@NgModule({
  declarations: [
    OfertaFormComponent,
    OfertaListComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    MatSelectModule,
    MatOptionModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    NgxMaskModule.forChild()
  ],
  exports: [
    OfertaFormComponent
  ]
})
export class OfertaModule { }
