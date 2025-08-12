import { Component, input, Input, OnInit } from '@angular/core';
import { Blog } from '../../models/Blog';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-blog-card',
  imports: [RouterLink],
  templateUrl: './blog-card.html',
  styleUrl: './blog-card.scss',
})
export class BlogCard implements OnInit {
  blog = input<Blog>();
  blogTime: string;

  ngOnInit(): void {
    if (this.blog().createdAt) {
      const time: string = new Date(this.blog().createdAt * 1000).toISOString();
      this.blogTime = time.split('T')[0];
    }
  }
}
