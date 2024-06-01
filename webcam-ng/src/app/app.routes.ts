import { Routes } from '@angular/router';
import { RecordComponent } from '../app/components/record/record.component';
import { AppComponent } from './app.component';
import { MyVideoComponent } from './components/my-video/my-video.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'record', component: RecordComponent },
  { path: 'my-video', component: MyVideoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignupComponent },
];
