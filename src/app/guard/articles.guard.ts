import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateChild,
  CanDeactivate,
  CanLoad,
  Route,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import {FormBuilder} from "@angular/forms";

export interface CheckDeactivate {
  CheckDeactivate(
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): Observable<boolean>;
}


@Injectable({
  providedIn: 'root',
})
export class ArticlesGuard

  implements CanActivateChild, CanLoad, CanDeactivate<CheckDeactivate>
{

  formBuilder!: FormBuilder
  constructor(private fb: FormBuilder,private authServies: AuthService) {}

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
      map((auth) => auth.productName === targetRoute)
    );
  }

  canDeactivate(
    component: CheckDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): Observable<boolean> {
    // checkDeactivate là 1 interface sẽ tạo ở bước 2
    return component.CheckDeactivate(currentRoute, currentState, nextState);
  }
}

// canActivate dùng cho component
// sự khác biệt giữa canLoad và canActivate, canActivate sẽ chặn next tới url nhưng vẫn load data.
// còn canLoad sẽ vừa chặn next tới url và chặn load data
// ==> ưu tiên dùng canLoad

/*CanLoad */
// CanLoad sử dụng cho layzy load module
// CanLoad sẽ giúp chúng ta thực thi logic mà kết quả nhận được là boolean.
// thông qua kết quả boolean, thì có cho phép router đến url đích hay không?

// sử dụng ng g guard 'nameServies' --flat --implements CanLoad để tạo guard services
// gọi services để lấy data tương ứng và xử lý trong logic của func CanLoad(){}
// bên ngoài routes dãn đến url, thêm key CanLoad và trỏ tới guard xử lý

/*CanActivateChild */
// canActivateChild sẽ thực thi trên các routes child và cho phép chúng ta có thể truy cập tới routes hay không?
// các bước gần tương tự với canActivate
// nhưng ở phía routes child, thêm key canActivateChild và trỏ tới guard xử lý

/* canDeActivate */
// canDeActivate sẽ kiểm tra xem có cho phép thoát khỏi component hay không? thường dùng trong trường hợp
// xử lý form người dùng, nếu người dùng đã thay đổi form thì sẽ ko cho thoát khỏi component và cần xác nhận trước khi thoát khỏi component

// bước 1: ở guard inplemant canDeactivate
// canDeactivate(
//   component: CheckDeactivate,
//   currentRoute: ActivatedRouteSnapshot,
//   currentState: RouterStateSnapshot,
//   nextState?: RouterStateSnapshot
// ): Observable<boolean> {
/* checkDeactivate là 1 interface sẽ tạo ở bước 2 */
//   return component.CheckDeactivate(currentRoute, currentState, nextState);
// }

// bước 2: tạo 1 interface checkDeactivate có các thuộc tính và trả về 1 observable<boolean> như canDeactivate cần

// bước 3: ở component cần CheckDeactivate, implement interface tạo ở bước 2,
// và thực thi các logic trả về true/false

// bước 4: ở router component cần CheckDeactivate, thêm CanDeactivate=[guard]
/* nếu return về urltree thì sẽ navigate hoặc redirect đến url mà mình return */
