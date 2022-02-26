import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  RouterStateSnapshot,
} from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ArticlesGuard implements CanActivate, CanActivateChild {
  constructor(private authServies: AuthService) {}

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const targetRoute = childRoute.params['name'];

    if (!targetRoute) {
      return of(false);
    }

    return this.authServies.currentUser.pipe(
      map((auth) => auth.name === targetRoute)
    );
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authServies.currentUser.pipe(
      map((user) => user.username === 'NguyenThacHung')
    );
  }
}

/*CanActivate */
// canActivate sẽ giúp chúng ta thực thi logic mà kết quả nhận được là boolean.
// thông qua kết quả boolean, thì có cho phép router đến url đích hay không?

// sử dụng ng g guard 'nameServies' --flat --implements CanActivate để tạo guard services
// gọi services để lấy data tương ứng và xử lý trong logic của func canActivate(){}
// bên ngoài routes dãn đến url, thêm key canActivate và trỏ tới guard xử lý

/*CanActivateChild */
// canActivateChild sẽ thực thi trên các routes child và cho phép chúng ta có thể truy cập tới routes hay không?
// các bước gần tương tự với canActivate
// nhưng ở phía routes child, thêm key canActivateChild và trỏ tới guard xử lý
