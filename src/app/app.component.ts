import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'employe-management';
  isLoading = false;

goToEmployes() {
  this.isLoading = true;
  // petite simulation de chargement avant navigation
  setTimeout(() => {
    this.isLoading = false;
  }, 1500);
}

}
