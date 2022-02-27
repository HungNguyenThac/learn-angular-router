import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ArticlesGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private authServies: AuthService) {}
  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
    return this.authServies.currentUser.pipe(
      map((user) => user.username === 'NguyenThacHung')
    );
  }

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

// sự khác biệt giữa canLoad và canActivate, canActivate sẽ chặn next tới url nhưng vẫn load data.
// còn canLoad sẽ vừa chặn next tới url và chặn load data
// ==> ưu tiên dùng canLoad

/*CanActivate */
// canActivate sử dụng cho component layout, hoặc module

// canActivate sẽ giúp chúng ta thực thi logic mà kết quả nhận được là boolean.
// thông qua kết quả boolean, thì có cho phép router đến url đích hay không?

// sử dụng ng g guard 'nameServies' --flat --implements CanActivate để tạo guard services
// gọi services để lấy data tương ứng và xử lý trong logic của func canActivate(){}
// bên ngoài routes dãn đến url, thêm key canActivate và trỏ tới guard xử lý

/*CanActivateChild */
// canActivateChild sẽ thực thi trên các routes child và cho phép chúng ta có thể truy cập tới routes hay không?
// các bước gần tương tự với canActivate
// nhưng ở phía routes child, thêm key canActivateChild và trỏ tới guard xử lý

/* nếu return về urltree thì sẽ navigate hoặc redirect đến url mà mình return */
