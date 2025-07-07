// app/register/register.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { DividerModule } from 'primeng/divider';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service'; // Ajusta la ruta según tu estructura
import { Usuario, RespuestaAutenticacion } from '../../../core/models/user.model'; // Ajusta la ruta según tu estructura
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    InputGroupModule,
    InputGroupAddonModule,
    DividerModule,
    RouterModule,
    ToastModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [MessageService]
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';

  cardStyles = {
    width: '25rem',
    overflow: 'hidden',
    borderRadius: '1rem',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    padding: '1.5rem'
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}

  register() {
    if (!this.username || !this.password || !this.confirmPassword) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Completa todos los campos' });
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Las contraseñas no coinciden' });
      return;
    }

    const userData: Usuario = { username: this.username, password: this.password };
    this.authService.register(userData).subscribe({
      next: (response: RespuestaAutenticacion) => {
        console.log('Registro exitoso', response);
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Usuario registrado exitosamente' });
      },
      error: (err) => {
        console.error('Error en el registro:', err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al registrar el usuario' });
      }
    });
  }
}
