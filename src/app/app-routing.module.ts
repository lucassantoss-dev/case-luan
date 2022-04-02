import { NgModule } from "@angular/core";
import { Routes, RouterModule, ActivatedRoute } from "@angular/router";
import { AuthComponent } from "./components/auth/auth.component";
import { ClienteFormComponent } from "./components/cliente/cliente-form/cliente-form.component";
import { CreateAccountComponent } from "./components/account/create-account/create-account.component";
import { LayoutComponent } from "./components/layout/layout/layout.component";
import { LoginComponent } from "./components/account/login/login.component";
import { AuthGuard } from "./resources/services/auth.guard";
import { ClienteListaComponent } from "./components/cliente/cliente-lista/cliente-lista.component";
import { EmpresaListComponent } from "./components/empresas/empresa-list/empresa-list.component";
import { EmpresaFormComponent } from "./components/empresas/empresa-form/empresa-form.component";
import { OfertaListComponent } from "./components/oferta/oferta-list/oferta-list.component";
import { OfertaFormComponent } from "./components/oferta/oferta-form/oferta-form.component";
import { LanceListComponent } from "./components/lance/lance-list/lance-list.component";
import { LanceFormComponent } from "./components/lance/lance-form/lance-form.component";

const routes: Routes = [
  {
    path: "",
    component: AuthComponent,
    children: [
      { path: "", redirectTo: "login", pathMatch: "full" },
      { path: "login", component: LoginComponent },
      { path: "create-account", component: CreateAccountComponent },
    ],
  },
  {
    path: "",
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "cliente-lista", component: ClienteListaComponent },
      { path: "cliente-form", component: ClienteFormComponent },
      { path: "cliente-form/:id", component: ClienteFormComponent },
      { path: "empresa-lista", component: EmpresaListComponent },
      { path: "empresa-form", component: EmpresaFormComponent },
      { path: "oferta-lista", component: OfertaListComponent },
      { path: "oferta-form", component: OfertaFormComponent },
      { path: "oferta-form/:id", component: OfertaFormComponent },
      { path: "lances-lista", component: LanceListComponent },
      { path: "lances-form", component: LanceFormComponent },
    ],
  },
  // {
  //   path: "",
  //   component: LayoutComponent,
  //   children: [
  //   ],
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
