import { Routes } from "@angular/router";
import { HomeComponent } from "../pages/home/home.component";
import { MainLayoutComponent } from "../../layouts/main/main-layout/main-layout.component";
import { ProfileManagementComponent } from "../pages/profile-management/profile-management.component";
import { AccountSettingsComponent } from "../pages/profile-management/account-settings/account-settings.component";
import { VideoStreamingComponent } from "../pages/video-streaming/video-streaming.component";

export const mainRoutes: Routes = [
    {
        path: 'home',
        component: MainLayoutComponent,
        children: [
            {
                path: '',
                component: HomeComponent,
            },
        ]
    },
    {
        path: 'video/:id',
        component: MainLayoutComponent,
        children: [
            {
                path: '',
                component: VideoStreamingComponent,
            },
        ]
    },
    
];
