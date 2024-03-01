import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import Validation from '../../utils/validation';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  loading: boolean = false;
  showSuccessMessage: boolean = false; // Ajout de la propriété

  submitted: boolean = false;
  registerForm: FormGroup = new FormGroup({
    nom: new FormControl(''),
    prenom: new FormGroup(''),
    mail: new FormGroup(''),
    mdp: new FormControl(''),
    confirmMdp: new FormControl(''),
  });
  error: string | undefined;

  constructor(private authService: AuthService, private fb: FormBuilder) {}
  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        nom: ['', [Validators.required]],
        prenom: ['', Validators.required],
        mail: ['', [Validators.required, Validators.email]],
        mdp: ['', [Validators.required, Validators.minLength(8)]],
        confirmMdp: ['', [Validators.required]],
      },
      {
        validators: [Validation.match('mdp', 'confirmMdp')],
      }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  register() {
    this.loading = true;

    this.submitted = true;
    if (this.registerForm.invalid) {
      this.loading = false;

      return;
    }
    this.authService.register(this.registerForm.value).subscribe({
      next: (res) => {
        console.log('Inscription effectué avec succès');
        this.loading = false;
        this.showSuccessMessage = true;
      },
      error: (error) => {
        this.error = error.error.message;
        this.loading = false;
        this.showSuccessMessage = false;
      },
    });
  }
}
