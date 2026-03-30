import { Routes } from '@angular/router'
import { EmployeListComponent } from './components/employe-list/employe-list.component'
import { EmployeFormComponent } from './components/employe-form/employe-form.component'

export const routes: Routes = [

  {path:'employes', component:EmployeListComponent},
  {path:'add', component:EmployeFormComponent},
  {path:'edit/:id', component:EmployeFormComponent},

  {path:'', redirectTo:'', pathMatch:'full'}

]