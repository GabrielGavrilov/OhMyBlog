import { Component, Input } from '@angular/core';
import { Blog } from '../../models/Blog';

@Component({
  selector: 'app-blog-card',
  imports: [],
  templateUrl: './blog-card.html',
  styleUrl: './blog-card.scss',
})
export class BlogCard {
  @Input() blog: Blog;
}
