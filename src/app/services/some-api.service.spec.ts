// Angular
import { TestBed, getTestBed, tick, fakeAsync } from '@angular/core/testing';
import { HttpRequest } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

// rxjs
import { take } from 'rxjs/operators';

// Services
import { SomeApiService, Store } from './some-api.service';

const someStoreSpy = jasmine.createSpyObj<Store>('Store', [
  'someAction'
]);

describe('SomeApiService', () => {
  let injector: TestBed;
  let service: SomeApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    injector = getTestBed();
    injector.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ { provide: Store, useValue: someStoreSpy }]
    });
    service = injector.get(SomeApiService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getSomeResource', () => {

    it('should send a get request to some-resource-url', fakeAsync(() => {
      const request: any = {};
      const response = null;

      service
        .getSomeResource(request)
        .pipe(take(1))
        .subscribe(value => {
          // Validate your mock response here.
          // This is useful if you are doing extra mappings or 
          // observable manipulation
          expect(value).toEqual(response);
        });
      const req = httpMock.expectOne(rq => {
        // Add any custom request validations here.
        return rq.url.startsWith(`some-resource-url`) 
            && rq.method === 'GET';
      });
      tick();
      req.flush(response);

      expect(someStoreSpy.someAction).toHaveBeenCalledWith(response);
    }));

  });

});
