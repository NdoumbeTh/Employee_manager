import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { Employe } from '../models/employe.model'

@Injectable({
  providedIn: 'root'
})
export class EmployeService {

  private apiUrl = "https://699ec4c178dda56d396b49c9.mockapi.io/test-mockup-api/v1/employes"

  constructor(private http: HttpClient) {}

  // récupérer tous les employés
  getEmployes(): Observable<Employe[]> {
  return this.http.get<any[]>(this.apiUrl).pipe(
    map(data => data.map(emp => ({
      id: Number(emp.id),
      nom: emp.name,
      prenom: emp.prenom || '',
      email: emp.email || '',
      poste: emp.fonction || '',
      telephone: emp.telephone || '',
      createdAt: emp.createdAt // <-- important
    })))
  )
}


  // récupérer un employé
  getEmployeById(id: number): Observable<Employe> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(emp => ({
        id: Number(emp.id),
        nom: emp.name,
        prenom: emp.prenom || '',
        email: emp.email || '',
        poste: emp.fonction || '',
        telephone: emp.telephone || ''
      }))
    )
  }

  // ajouter un employé
  addEmploye(employe: Employe) {
    const payload = {
      name: employe.nom,          // convertit "nom" → "name"
      prenom: employe.prenom,
      email: employe.email,
      fonction: employe.poste,    // convertit "poste" → "fonction"
      telephone: employe.telephone
    }
    return this.http.post(this.apiUrl, payload)
  }

  // modifier un employé
  updateEmploye(id: number, employe: Employe) {
    const payload = {
      name: employe.nom,
      prenom: employe.prenom,
      email: employe.email,
      fonction: employe.poste,
      telephone: employe.telephone
    }
    return this.http.put(`${this.apiUrl}/${id}`, payload)
  }

  // supprimer un employé
  deleteEmploye(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`)
  }
}
