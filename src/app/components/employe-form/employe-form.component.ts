import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { EmployeService } from '../../services/employe.service'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-employe-form',
  imports: [ReactiveFormsModule, CommonModule, ],
  templateUrl: './employe-form.component.html',
  styleUrl: './employe-form.component.css',
})

export class EmployeFormComponent implements OnInit {

  // ── Propriétés utilisées dans le HTML ──
  isEditMode = false
  isSaving   = false
  id: number | null = null

  employeForm = new FormGroup({
    nom:       new FormControl('', Validators.required),
    prenom:    new FormControl('', Validators.required),
    email:     new FormControl('', [Validators.required, Validators.email]),
    poste:     new FormControl('', Validators.required),
    telephone: new FormControl('', Validators.required)
  })

  constructor(
    private employeService: EmployeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const paramId = this.route.snapshot.paramMap.get('id')
    this.id = paramId ? Number(paramId) : null

    if (this.id) {
      this.isEditMode = true

      this.employeService.getEmployeById(this.id)
        .subscribe(emp => {
          this.employeForm.patchValue(emp)
        })
    }
  }

  save(): void {
    if (this.employeForm.invalid) return

    this.isSaving = true

    const employe = {
      nom:       this.employeForm.value.nom       || '',
      prenom:    this.employeForm.value.prenom    || '',
      email:     this.employeForm.value.email     || '',
      poste:     this.employeForm.value.poste     || '',
      telephone: this.employeForm.value.telephone || ''
    }

    if (this.id) {
      this.employeService.updateEmploye(this.id, employe)
        .subscribe({
          next: () => this.router.navigate(['/employes']),
          error: () => { this.isSaving = false }
        })
    } else {
      this.employeService.addEmploye(employe)
        .subscribe({
          next: () => this.router.navigate(['/employes']),
          error: () => { this.isSaving = false }
        })
    }
  }

}