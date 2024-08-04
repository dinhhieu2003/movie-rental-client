import { Routes } from "@angular/router";
import { HomeComponent } from "../pages/home/home.component";
import { MainLayoutComponent } from "../../layouts/main/main-layout/main-layout.component";
import { ProfileManagementComponent } from "../pages/profile-management/profile-management.component";
import { AccountSettingsComponent } from "../pages/profile-management/account-settings/account-settings.component";
import { VideoStreamingComponent } from "../pages/video-streaming/video-streaming.component";
import { SeriesComponent } from "../pages/series/series.component";
import { MovieComponent } from "../pages/movie/movie.component";
import { PricingComponent } from "../pages/pricing/pricing.component";
import { SearchComponent } from "../pages/search/search.component";
import { AlbumComponent } from "../components/album/album.component";
import { AlbumDetailComponent } from "../pages/album-detail/album-detail.component";
import { CheckoutComponent } from "../pages/checkout/checkout.component";
import { authGuard } from "../../core/guard/auth.guard";


export const mainRoutes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            {
                path: '',
                component: HomeComponent,
            },
            {
                path:'series',
                component: SeriesComponent,
            },
            {
                path:'movie',
                component: MovieComponent,
            },

            {
                path: 'pricing',
                component: PricingComponent,
            },
            {
                path: 'search',
                component: SearchComponent,
            },
            {
                path:'album',
                component: AlbumDetailComponent,
            },

            {
                path: 'checkout',
                component: CheckoutComponent,
            },
            {
                path: 'me',
                component: ProfileManagementComponent,
                children: [
                    {
                        path: 'account',
                        component: AccountSettingsComponent,
                    }
                ],
                canActivate: [authGuard],
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
