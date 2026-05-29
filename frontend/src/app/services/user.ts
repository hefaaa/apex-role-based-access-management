import { Injectable }
from '@angular/core';

import { HttpClient }
from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  api =
    'https://apex-role-based-access-management.onrender.com/api/users';

  constructor(
    private http: HttpClient
  ) {}

  getUsers() {

    return this.http.get(
      this.api
    );

  }

  addUser(data: any) {

    return this.http.post(
      this.api,
      data
    );

  }

  updateUser(
    id: string,
    data: any
  ) {

    return this.http.put(

      `${this.api}/${id}`,

      data

    );

  }

  toggleStatus(
    id: string
  ) {

    return this.http.patch(

      `${this.api}/${id}/status`,

      {}

    );

  }

  deleteUser(
    id: string
  ) {

    return this.http.delete(

      `${this.api}/${id}`

    );

  }

}
