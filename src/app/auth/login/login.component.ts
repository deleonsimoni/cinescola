import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  email: string;
  password: string;
  carregando: false;

  ngOnInit() {
  }

  login(): void {

    if (!this.email || !this.password) {
      alert('Preencha corretamente os campos de acesso.');
    } else {
      this.authService.login(this.email, this.password)
        .subscribe(data => {
          this.authService.setUser(data.user, data.token);
          this.router.navigate(['']);
        }, err => {
          if (err.status === 401) {
            this.toastr.error('Email ou senha inválidos', 'Erro: ');
          }
        });
    }
  }

}
