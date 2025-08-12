import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Blog } from '../models/Blog';
import { Observable } from 'rxjs';
import { PageResponse } from '../models/Paging';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  constructor(private httpClient: HttpClient) {}

  getBlogs(): Observable<PageResponse<Blog>> {
    return this.httpClient.get<PageResponse<Blog>>(
      'http://localhost:5263/api/v1/blogs'
    );
  }
}
