import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars, faCloudMoon } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-menubar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    CommonModule,
    ButtonModule,
    MenubarModule,
    FontAwesomeModule,
  ],
  templateUrl: './menubar.component.html',
  styleUrl: './menubar.component.css',
})
export class MenubarComponent implements OnInit {
  items: MenuItem[] = [];
  faBars = faBars;
  faCloudMoon = faCloudMoon;
  ngOnInit(): void {
    this.items = [
      {
        label: 'Home',
        routerLink: ['/'],
      },
      {
        label: 'Record',
        routerLink: ['/record'],
      },
      {
        label: 'My Videos',
        routerLink: ['/my-video'],
      },
      {
        label: 'Login',
        routerLink: ['/login'],
      },
    ];
  }
}
