import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { ArticulosComponent } from './articulos/articulos.component';
import { FormComponent } from './articulos/form.component';
import { ArticuloService } from './articulos/articulo.service';
import { UsuarioService } from './login/usuario.service';
import { RegisterUserComponent } from './register-user/register-user.component';
import { CargoComponent } from './cargo/cargo.component';
import { CargoService } from './cargo/cargo.service';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { Globals } from './globals';


export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    ArticulosComponent,
    FormComponent,
    RegisterUserComponent,
    CargoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    NgbModule,
    BrowserAnimationsModule,
    TooltipModule.forRoot(),
    NgxMaskModule.forRoot()
  ],
  providers: [ArticuloService,UsuarioService,CargoService,Globals],
  bootstrap: [AppComponent]
})
export class AppModule { }
