import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Credentials, CredentialsService } from './credentials.service';
import { stringLiteral } from 'babel-types';

export interface LoginContext {
  email: string;
  password: string;
  remember?: boolean;
}

export interface createUserContext {
  email: string;
  password: string;
}

/**
 * Provides a base for authentication workflow.
 * The login/logout methods should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(public credentialsService: CredentialsService, private httpClient: HttpClient) {}
  /**
   * Authenticates the user.
   * @param context The login parameters.
   * @return The user credentials.
   */
  login(context: LoginContext): Observable<Credentials> {
    const credential = {
      email: '',
      token: '',
      expiresIn: 0
    };
    this.credentialsService.setCredentials(credential, context.remember);
    return this.httpClient.post<{ email: string; token: string; expiresIn: number }>(
      '/api/user/login',
      context
    );
  }

  /**
   * Create the user.
   * @param context The user parameters.
   * @return The user credentials.
   */
  createUser(context: createUserContext): Observable<Credentials> {
    console.log(context);
    const credential = {
      token: ''
    };

    this.httpClient.post('/api/user/signup', context).subscribe(response => {
      console.log(response);
    });

    //this.credentialsService.setCredentials(credential);
    return this.login(context);
  }

  /**
   * Logs out the user and clear credentials.
   * @return True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    const credentialsKey = 'credentials';
    sessionStorage.removeItem(credentialsKey);
    return of(true);
  }
}
