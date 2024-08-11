import { ResolveFn } from '@angular/router';
import { BaseResponse } from '../../models/BaseResponse.model';
import { CategoryService } from './category.service';
import { inject } from '@angular/core';
import { Category } from '../../../main/models/category';
import { Observable } from 'rxjs';

export const categoryResolver: ResolveFn<Observable<Category[]>> = (route, state) => {
  return inject(CategoryService).getAllCategory();
};
