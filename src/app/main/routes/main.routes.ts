import { Routes } from "@angular/router";
import { HomeComponent } from "../pages/home/home.component";
import { MainLayoutComponent } from "../../layouts/main/main-layout/main-layout.component";
import { ProfileManagementComponent } from "../pages/profile-management/profile-management.component";
import { AccountSettingsComponent } from "../pages/profile-management/account-settings/account-settings.component";
import { VideoStreamingComponent } from "../pages/video-streaming/video-streaming.component";
import { MovieComponent } from "../pages/movie/movie.component";
import { PricingComponent } from "../pages/pricing/pricing.component";
import { SearchComponent } from "../pages/search/search.component";
import { AlbumComponent } from "../components/album/album.component";
import { AlbumDetailComponent } from "../pages/album-detail/album-detail.component";
import { CheckoutComponent } from "../pages/checkout/checkout.component";
import { authGuard } from "../../core/guard/auth.guard";
import { CategoryService } from "../../core/services/main/category.service";
import { inject } from "@angular/core";
import { CartComponent } from "../pages/profile-management/cart/cart.component";
import { TransactionHistoryComponent } from "../pages/profile-management/transaction-history/transaction-history.component";
import { MoviesRentalListComponent } from "../pages/profile-management/movies-rental-list/movies-rental-list.component";
import { MyMailComponent } from "../pages/profile-management/my-mail/my-mail.component";
import { ManageLoginDevicesComponent } from "../pages/profile-management/manage-login-devices/manage-login-devices.component";
import { FilmStreamingComponent } from "../pages/film-streaming/film-streaming.component";

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
                path: 'category/:slug',
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
                path:'album/:id',
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
                    },
                    {
                        path: 'cart',
                        component: CartComponent,
                    },
                    {
                        path: 'transaction-history',
                        component: TransactionHistoryComponent,
                    },
                    {
                        path: 'rental-list',
                        component: MoviesRentalListComponent,
                    },
                    {
                        path: 'mailbox',
                        component: MyMailComponent,
                    },
                    {
                        path: 'login-devices',
                        component: ManageLoginDevicesComponent,
                    },
                    
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
                component: FilmStreamingComponent,
            },
        ]
    },
    

    
];
