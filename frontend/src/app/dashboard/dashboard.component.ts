import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {


  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/auth/login']);
    });
  }

}
