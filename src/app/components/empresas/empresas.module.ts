import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpresaListComponent } from './empresa-list/empresa-list.component';
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
import { EmpresaFormComponent } from './empresa-form/empresa-form.component';



@NgModule({
  declarations: [
    EmpresaListComponent,
    EmpresaFormComponent
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
    EmpresaFormComponent
  ]
})
export class EmpresasModule { }
