import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from 'app/core/auth/auth.service';
import { switchMap } from 'rxjs/operators';
// import * as jwt_decode from 'jwt-decode';
import jwt_decode from "jwt-decode";



@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad
{
    

    jwtToken: string;
    decodedToken: { [key: string]: string };


    constructor(
        private _authService: AuthService,
        private _router: Router
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Can activate
     *
     * @param route
     * @param state
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean
    {
        const redirectUrl = state.url === '/sign-out' ? '/' : state.url;
        return this._check(redirectUrl);
    }

    /**
     * Can activate child
     *
     * @param childRoute
     * @param state
     */
    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
    {
        const redirectUrl = state.url === '/sign-out' ? '/' : state.url;
        return this._check(redirectUrl);
    }

    /**
     * Can load
     *
     * @param route
     * @param segments
     */
    canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean
    {
        return this._check('/');
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Check the authenticated status
     *
     * @param redirectURL
     * @private
     */
    private _check(redirectURL: string): Observable<boolean>
    {
        let token = localStorage.getItem('token')
        // Check the authentication status
        if(token){
            this.setToken(token)
            return of(true)
        } else {
            this._router.navigate(['sign-in'], {queryParams: {redirectURL}});
            return of(false)
        }
        //  token.pipe(
        //                switchMap((authenticated) => {

        //                    // If the user is not authenticated...
        //                    if ( !authenticated )
        //                    {
        //                        // Redirect to the sign-in page
        //                        this._router.navigate(['sign-in'], {queryParams: {redirectURL}});

        //                        // Prevent the access
        //                        return of(false);
        //                    }

        //                    // Allow the access
        //                    return of(true);
        //                })
        //            );
    }




    setToken(token: string) {
        if (token) {
          this.jwtToken = token;
        }
      }
  
      decodeToken() {
        if (this.jwtToken) {
        this.decodedToken = jwt_decode(this.jwtToken);
        }
      }
  
      getDecodeToken() {
        return jwt_decode(this.jwtToken);
      }
  
      getUser() {
        this.decodeToken();
        return this.decodedToken ? this.decodedToken.displayname : null;
      }
  
      getEmailId() {
        this.decodeToken();
        return this.decodedToken ? this.decodedToken.email : null;
      }
  
      getExpiryTime() {
        this.decodeToken();
        return this.decodedToken ? this.decodedToken.exp : null;
      }
  
      isTokenExpired(): boolean {
        const expiryTime:any = this.getExpiryTime();
        if (expiryTime) {
          return ((1000 * expiryTime) - (new Date()).getTime()) < 5000;
        } else {
          return false;
        }
      }
}
