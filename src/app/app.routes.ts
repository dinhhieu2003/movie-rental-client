import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './main/pages/home/home.component';

export const routes: Routes = [
    { path: 'movie', loadChildren: () => import('./management/routes/management.routes').then(m => m.managementRoutes) },
    {path:"",component:HomeComponent},
    {path:"login",component:LoginComponent},
];
