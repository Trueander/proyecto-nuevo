import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrmFormComponent } from './crm/crm-form/crm-form.component';
import { CrmComponent } from './crm/crm.component';
import { EgresadosComponent } from './egresados/egresados.component';
import { EquifaxComponent } from './equifax/equifax.component';
import { ReniecComponent } from './reniec/reniec.component';

const routes: Routes = [
  { path: '', component: CrmComponent },
  { path: 'crmForm', component: CrmFormComponent },
  { path: 'equifax', component: EquifaxComponent },
  { path: 'egresados', component: EgresadosComponent },
  { path: 'reniec', component: ReniecComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
