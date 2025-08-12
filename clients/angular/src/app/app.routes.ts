import { Routes } from '@angular/router';
import { App } from './app';
import { Blog } from './components/blog/blog';

export const routes: Routes = [
  {
    path: '',
    component: App,
  },
  {
    path: 'blog',
    component: Blog,
  },
];
