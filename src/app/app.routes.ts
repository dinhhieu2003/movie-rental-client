import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'movie', loadChildren: () => import('./management/routes/management.routes').then(m => m.managementRoutes) },
];
