import { Component, Input, OnDestroy, OnInit, signal } from '@angular/core';
import { Blog } from '../../models/Blog';
import { BlogCard } from '../blog-card/blog-card';
import { BlogService } from '../../services/blog-service';

@Component({
  selector: 'app-blog-list',
  imports: [BlogCard],
  templateUrl: './blog-list.html',
  styleUrl: './blog-list.scss',
})
export class BlogList implements OnInit {
  blogs = signal<Blog[]>([]);
  route: string;

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.blogService.getBlogs().subscribe((pagedBlogs) => {
      this.blogs.set(pagedBlogs.content);
    });
  }
}
