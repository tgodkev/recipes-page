import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {catchError, Subject, tap, throwError,} from "rxjs";
import {UserModel} from "./user.model";

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToke: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {
  user = new Subject<UserModel>()

  constructor(private http: HttpClient) {
  }

  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCUScWdpJ38PjsLEFu6zivCB25UOBhm5LM',
      {
        email: email,
        password: password,
        returnSecureToken: true
      })
      .pipe(catchError(errorRes => {
        let errorMessage = "A unknown error occured."
        if (!errorRes.error || !errorRes.error.error) {
          return throwError(() => errorMessage)
        }
        switch (errorRes.error.error.message) {
          case 'EMAIL_EXISTS':
            errorMessage = "This email exists already."
        }
        return throwError(() => errorMessage)

      }), tap(resData => {
        const date = new Date(new Date().getTime() + +resData.expiresIn * 1000);
        const user = new UserModel(resData.email, resData.localId, resData.idToken, date)
        this.user.next(user)
      }))
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCUScWdpJ38PjsLEFu6zivCB25UOBhm5LM',
      {
        email: email,
        password: password,
        returnSecureToke: true,
      })
  }
}
