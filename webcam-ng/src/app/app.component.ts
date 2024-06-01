import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RecordComponent } from './components/record/record.component';

import { MenubarComponent } from './components/menubar/menubar.component';
import { HomepageComponent } from './components/homepage/homepage.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RecordComponent, MenubarComponent, HomepageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  @ViewChild('myTopNav') topnav!: ElementRef;
  ngOnInit(): void {}
}
