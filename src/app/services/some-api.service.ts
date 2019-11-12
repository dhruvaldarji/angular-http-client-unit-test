import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { tap } from 'rxjs/operators';

@Injectable()
export class Store {
  someAction(any) {}
}

@Injectable()
export class SomeApiService {

  constructor(private http: HttpClient,  private store: Store) { }

  getSomeResource(someParams?: any) {
    return this.http.get('some-resource-url', { params: someParams }).pipe(
      tap(response => {
        if (response) {
          this.store.someAction(response);
        }
      })
    );
  }
}
