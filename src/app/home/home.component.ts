import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { QuoteService } from './quote.service';
import { Credentials, CredentialsService } from '../core/authentication/credentials.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  quote: string | undefined;
  isLoading = false;
  
  constructor(private quoteService: QuoteService, private credentialsService: CredentialsService) {}

  ngOnInit() {
    const credentialsKey = 'credentials';
    const storage = sessionStorage.getItem(credentialsKey);
    this.quote = storage;
    this.isLoading = true;
    this.quoteService
      .getRandomQuote({ category: 'dev' })
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((quote: string) => {
        //this.quote = this.credentialsService.credentials();
      });
  }
}
