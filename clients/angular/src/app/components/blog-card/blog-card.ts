import { Component, input, Input, OnInit } from '@angular/core';
import { Blog } from '../../models/Blog';

@Component({
  selector: 'app-blog-card',
  imports: [],
  templateUrl: './blog-card.html',
  styleUrl: './blog-card.scss',
})
export class BlogCard implements OnInit {
  blog = input<Blog>();

  blogTime!: string;

  ngOnInit(): void {
    if (this.blog().createdAt) {
      this.blogTime = this.blog().createdAt.split('T')[0];
    }
  }
}
