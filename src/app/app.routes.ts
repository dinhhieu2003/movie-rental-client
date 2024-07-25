import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './main/pages/home/home.component';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./main/routes/main.routes').then(m => m.mainRoutes),
    }
];
