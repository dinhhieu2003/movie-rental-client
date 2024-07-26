import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';


export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./main/routes/main.routes').then(m => m.mainRoutes),
    },
    { path: "login", component: LoginComponent },
];

