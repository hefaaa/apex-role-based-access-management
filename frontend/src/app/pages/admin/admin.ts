import {
  Component,
  OnInit
} from '@angular/core';

import { CommonModule }
from '@angular/common';

import { FormsModule }
from '@angular/forms';

import { UserService }
from '../../services/user';


@Component({

  selector: 'app-admin',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule
  ],

  templateUrl: './admin.html',

  styleUrls: ['./admin.scss']

})

export class Admin
implements OnInit {

  users: any[] = [];

  name = '';

  email = '';

  username = '';

  password = '';

  department = 'IT';

  role = 'General User';

  loading = true;

  editingUserId = '';

  constructor(
    private userService: UserService
  ) {}

  ngOnInit(): void {

    this.loadUsers();

  }

  loadUsers() {

    this.loading = true;

    this.userService
      .getUsers()
      .subscribe((res: any) => {

        this.users = res;

        this.loading = false;

      });

  }

  addUser() {

  if (

    !this.name.trim() ||

    !this.email.trim() ||

    !this.username.trim() ||

    !this.password.trim()

  ) {

    alert('All fields are required');

    return;

  }

  this.userService.addUser({

    name: this.name,

    email: this.email,

    username: this.username,

    password: this.password,

    department: this.department,

    role: this.role

  }).subscribe({

    next: () => {

      this.name = '';

      this.email = '';

      this.username = '';

      this.password = '';

      this.department = 'IT';

      this.role = 'General User';

      this.loadUsers();

      alert('User added successfully');

    },

    error: (err: any) => {

      if (err.error?.message) {

        alert(err.error.message);

      } else {

        alert('Failed to add user');

      }

    }

  });

}
 toggleStatus(user: any) {

  this.userService
    .toggleStatus(user._id)
    .subscribe(() => {

      this.loadUsers();

    });

}


editUser(user: any) {

  this.name = user.name;

  this.email = user.email;

  this.username = user.username;

  this.password = user.password;

  this.department = user.department;

  this.role = user.role;

  this.editingUserId = user._id;

}

  deleteUser(id: string) {

    this.userService
      .deleteUser(id)
      .subscribe(() => {

        this.loadUsers();

      });

  }
updateUser() {

  if (!this.editingUserId) {

    return;

  }

  this.userService.updateUser(

    this.editingUserId,

    {

      name: this.name,

      email: this.email,

      username: this.username,

      password: this.password,

      department: this.department,

      role: this.role

    }

  ).subscribe({

    next: () => {

      alert('User updated successfully');

      this.editingUserId = '';

      this.name = '';

      this.email = '';

      this.username = '';

      this.password = '';

      this.department = 'IT';

      this.role = 'General User';

      this.loadUsers();

    },

    error: (err: any) => {

      alert(
        err.error?.message ||
        'Update failed'
      );

    }

  });

}

}