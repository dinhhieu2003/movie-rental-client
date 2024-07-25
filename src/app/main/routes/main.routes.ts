import { Routes } from "@angular/router";
import { HomeComponent } from "../pages/home/home.component";
import { MainLayoutComponent } from "../../layouts/main/main-layout/main-layout.component";

export const mainRoutes: Routes = [
    {
        path: 'home',
        component: MainLayoutComponent,
        children: [
            {
                path: '',
                component: HomeComponent,
            }
        ]
    }
];