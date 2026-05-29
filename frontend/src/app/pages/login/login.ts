import { Component }
from '@angular/core';

import { Router }
from '@angular/router';

import { FormsModule }
from '@angular/forms';

import { CommonModule }
from '@angular/common';

import { AuthService }
from '../../services/auth';


@Component({

  selector: 'app-login',

  standalone: true,

  imports: [
    FormsModule,
    CommonModule
  ],

  templateUrl: './login.html',

  styleUrls: ['./login.scss']

})

export class Login {

  username = '';

  password = '';

  role = 'General User';

  loading = false;

  constructor(

    private auth: AuthService,

    private router: Router

  ) {}

  login() {

    this.loading = true;

    this.auth.login({

      username: this.username,

      password: this.password,

      role: this.role

    }).subscribe({

      next: (res: any) => {

        localStorage.setItem(

          'token',

          res.token

        );

        localStorage.setItem(

          'user',

          JSON.stringify(res.user)

        );

        this.loading = false;

        this.router.navigate([
          '/dashboard'
        ]);

      },

      error: () => {

        alert(
          'Invalid Credentials'
        );

        this.loading = false;

      }

    });

  }

}