import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { categoryResolver } from './category.resolver';
import { Category } from '../../../main/models/category';

describe('categoryResolver', () => {
  const executeResolver: ResolveFn<Category[]> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => categoryResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
