import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PushnotificationService } from '../../service/pushnotification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loading: boolean = false;
  dynamicText: string = '';
  error: string | undefined;
  loginForm: FormGroup;

  email: string | undefined;
  password: string | undefined; // Déclarez la propriété password ici

  submitted: boolean = false;

  @Input() role: number = 0;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private push: PushnotificationService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    // Obtenez l'URL actuelle
    const currentUrl = this.router.url;

    // Utilisez une condition pour définir le texte dynamique en fonction de l'URL
    if (currentUrl.includes('/loginAdmin')) {
      this.dynamicText = ' - Administrateur';
    } else if (currentUrl.includes('/loginEmploye')) {
      this.dynamicText = ' - Employé';
    } else {
      this.dynamicText = ' - Client'; // Autre URL, aucun texte dynamique
    }

    // Récupérer les valeurs par défaut de l'email et du mot de passe à partir des données de la route
    this.route.data.subscribe((data) => {
      this.loginForm.patchValue({
        email: data['email'],
        password: data['password'],
      });
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  login() {
    this.loading = true;
    this.submitted = true;
    if (this.loginForm.invalid) {
      this.loading = false;
      return;
    }
    this.authService.login(this.loginForm.value, this.role).subscribe({
      next: (res) => {
        // Handle successful login, e.g., store token in local storage
        console.log('Login successful:', res.token);
        this.authService.addAuthToken(res.token);
        this.authService.addRole(this.role + '');
        if (this.role == 30) {
          this.router.navigate(['/admin/statistiques']);
        } else if (this.role == 10) {
          this.push.requestPermission();
          this.router.navigate(['/client/list']);
        } else {
          this.router.navigate(['/employe/rdv']);
        }
        this.loading = false;
      },
      error: (error) => {
        this.error = error.error.message;
        console.error('Login error:', error.error.message);
        this.loading = false;
      },
    });
  }
}
