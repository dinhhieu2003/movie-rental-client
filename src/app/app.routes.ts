import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './management/pages/dashboard/dashboard.component';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./main/routes/main.routes').then(m => m.mainRoutes),
    },
    { path: "login", component: LoginComponent },
    { path: "management", component: DashboardComponent,
      loadChildren: () => import('./management/routes/management.routes').then(m => m.managementRoutes)  
    },
];

