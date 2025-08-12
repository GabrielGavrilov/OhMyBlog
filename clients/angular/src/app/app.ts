import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { BlogList } from './components/blog-list/blog-list';
import { Blog } from './models/Blog';
import { BlogService } from './services/blog-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, BlogList],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected readonly title = signal('angular');

  blogs = signal<Blog[]>([]);

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.blogService.getBlogs().subscribe((pagedBlogs) => {
      this.blogs.set(pagedBlogs.content);
    });
  }
}
