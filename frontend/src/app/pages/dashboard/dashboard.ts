import {
  Component,
  OnInit
} from '@angular/core';

import { CommonModule }
from '@angular/common';

import { FormsModule }
from '@angular/forms';

import { RouterModule }
from '@angular/router';



@Component({

  selector: 'app-dashboard',

  standalone: true,

  imports: [
  CommonModule,
  FormsModule,
  RouterModule
          ],

  templateUrl: './dashboard.html',

  styleUrls: ['./dashboard.scss']

})

export class Dashboard
implements OnInit {

  user: any = {};

  searchTerm = '';

  

 
  records = [

    {
      id: 1,
      device: 'Finance Server',
      status: 'Active',
      priority: 'High',
      access: 'Admin Only',
      assignedTo: 'admin'
    },

    {
      id: 2,
      device: 'HR Dashboard',
      status: 'Active',
      priority: 'Medium',
      access: 'Public',
      assignedTo: 'user'
    },

    {
      id: 3,
      device: 'Analytics Panel',
      status: 'Inactive',
      priority: 'Low',
      access: 'Public',
      assignedTo: 'user'
    }

  ];

  filteredRecords: any[] = [];

  ngOnInit(): void {

    const storedUser =
      localStorage.getItem('user');

    if (storedUser) {

      this.user =
        JSON.parse(storedUser);

    }

   

    this.filterRecords();

  }


  filterRecords() {

    let data = [...this.records];

    if (
      this.user.role !== 'Admin'
    ) {

      data = data.filter(

        r =>

          r.access === 'Public' ||

          r.assignedTo ===
          this.user.username

      );

    }

    if (
      this.searchTerm
    ) {

      data = data.filter(

        r =>
          r.device
            .toLowerCase()
            .includes(
              this.searchTerm
                .toLowerCase()
            )

      );

    }

    this.filteredRecords =
      data;

  }

  logout() {

    localStorage.clear();

    window.location.href = '/';

  }

}