import { Component, Input } from '@angular/core';
import { Blog } from '../../models/Blog';
import { BlogCard } from '../blog-card/blog-card';

@Component({
  selector: 'app-blog-list',
  imports: [BlogCard],
  templateUrl: './blog-list.html',
  styleUrl: './blog-list.scss',
})
export class BlogList {
  @Input() blogs: Blog[];
}
