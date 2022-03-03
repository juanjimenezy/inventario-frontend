import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticulosComponent } from './articulos/articulos.component';
import { FormComponent } from './articulos/form.component';
import { CargoComponent } from './cargo/cargo.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { RegisterUserComponent } from './register-user/register-user.component';

const routes: Routes = [
  { path: '', component: HeaderComponent, pathMatch: 'full'},
  { path: 'Menu/:id', component: HeaderComponent},
  { path: 'Login', component: LoginComponent},
  { path: 'Register', component: RegisterUserComponent},
  { path: 'Articulos/:usu', component: ArticulosComponent },
  { path: 'Articulos/form/:usu', component: FormComponent},
  { path: 'Articulos/form/:usu/:id', component: FormComponent},
  { path: 'Cargos', component: CargoComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
