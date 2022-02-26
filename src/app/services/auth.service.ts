import { IUser } from './../model';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  get currentUser(): Observable<IUser> {
    return of({
      username: 'NguyenThacHung',
      password: '1231234',
      name: 'productA',
    });
  }
}
