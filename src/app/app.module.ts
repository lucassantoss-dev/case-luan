import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/account/login/login.component';
import { LayoutComponent } from './components/layout/layout/layout.component';
import { SidebarComponent } from './templates/sidebar/sidebar.component';
import { ClienteFormComponent } from './components/cliente/cliente-form/cliente-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClienteRoutingModule } from './components/cliente/cliente-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './templates/navbar/navbar.component';
import { ClienteModule } from './components/cliente/cliente.module';
import { ClienteService } from './resources/services/cliente.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthComponent } from './components/auth/auth.component';
import { CreateAccountComponent } from './components/account/create-account/create-account.component';
import { NgxMaskModule } from 'ngx-mask';
import { TokenInterceptor } from './token.interceptor';
import { EmpresasService } from './resources/services/empresas.service';
import { EmpresasModule } from './components/empresas/empresas.module';
import { LanceModule } from './components/lance/lance.module';
import { OfertaModule } from './components/oferta/oferta.module';
import { OfertasService } from './resources/services/ofertas.service';
import { LancesService } from './resources/services/lances.service';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutComponent,
    SidebarComponent,
    NavbarComponent,
    AuthComponent,
    CreateAccountComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ClienteRoutingModule,
    BrowserAnimationsModule,
    EmpresasModule,
    LanceModule,
    OfertaModule,
    ClienteModule,
    NgxMaskModule.forRoot({
      dropSpecialCharacters: false,
    }),
  ],
  providers: [
    ClienteService,
    EmpresasService,
    OfertasService,
    LancesService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
