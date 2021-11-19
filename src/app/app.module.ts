import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CrmComponent } from './crm/crm.component';
import { EgresadosComponent } from './egresados/egresados.component';
import { EquifaxComponent } from './equifax/equifax.component';
import { HeaderComponent } from './header/header.component';
import { ReniecComponent } from './reniec/reniec.component';
import { CrmFormComponent } from './crm/crm-form/crm-form.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    CrmComponent,
    EgresadosComponent,
    EquifaxComponent,
    HeaderComponent,
    ReniecComponent,
    CrmFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
