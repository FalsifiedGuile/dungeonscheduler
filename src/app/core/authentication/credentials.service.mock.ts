import { Credentials } from './credentials.service';

export class MockCredentialsService {
  credentials: Credentials | null = {
    email: 'test@test',
    expiresIn: 367,
    token: '123'
  };

  isAuthenticated(): boolean {
    return !!this.credentials;
  }

  setCredentials(credentials?: Credentials, _remember?: boolean) {
    this.credentials = credentials || null;
  }
}
