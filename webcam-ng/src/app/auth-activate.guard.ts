import { CanActivateFn, Router } from '@angular/router';
import { Injectable, inject } from '@angular/core';
import { AuthService } from './service/auth.service';
import axios from 'axios';

const myUrl = 'http://localhost:3000/api/';
const getTokenUrl = myUrl + 'get-token';

export const authActivateGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  let needRedirect = true;
  authService.isLoggedIn().subscribe({
    next: (data) => {
      console.log('data', data);
      if (data.user != -1) {
        needRedirect = false;
      } else {
        router.navigate(['./login']);
        needRedirect = true;
      }
    },
    error: (err) => {
      console.log(err);
      needRedirect = true;
    },
  });
  return needRedirect;
};
