import { Routes } from '@angular/router';
import { App } from './app';
import { Blog } from './components/blog/blog';
import { BlogList } from './components/blog-list/blog-list';
import { AuthForm } from './components/auth-form/auth-form';

export const routes: Routes = [
  {
    path: '',
    component: BlogList,
  },
  {
    path: 'login',
    component: AuthForm,
  },
  {
    path: 'blogs',
    children: [
      {
        path: ':id',
        component: Blog,
      },
    ],
  },
];
