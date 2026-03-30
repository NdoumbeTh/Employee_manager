import { Component } from '@angular/core'
import { EmployeService } from '../../services/employe.service'
import { Employe } from '../../models/employe.model'
import { Router } from '@angular/router'

@Component({
  selector: 'app-employe-list',
  templateUrl: './employe-list.component.html',
  styleUrl: './employe-list.component.css'
})

export class EmployeListComponent {

  employes:Employe[]=[]

  constructor(
    private employeService:EmployeService,
    private router:Router
  ){}

  ngOnInit(){
    this.loadEmployes()
  }

isLoading = false;

loadEmployes() {
  this.isLoading = true; // active le loading

  this.employeService.getEmployes().subscribe({
    next: (data) => {
      this.employes = data.reverse(); // ou tri par createdAt
      this.isLoading = false;         // désactive le loading
    },
    error: () => {
      this.isLoading = false;
    }
  });
}

  deleteEmploye(id:number){

    this.employeService.deleteEmploye(id).subscribe(()=>{
      this.loadEmployes()
    })

  }

  editEmploye(id:number){
    this.router.navigate(['/edit',id])
  }

}