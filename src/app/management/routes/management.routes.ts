import { Routes } from "@angular/router";
import { DashboardComponent } from "../pages/dashboard/dashboard.component";
import { MovieListComponent } from "../pages/movie-list/movie-list.component";
import { CategoryMovieComponent } from "../pages/category-movie/category-movie.component";
import { UserManagementComponent } from "../pages/user-management/user-management.component";
import { BillManagementComponent } from "../pages/bill-management/bill-management.component";
import { BannerManagementComponent } from "../pages/banner-management/banner-management.component";
import { GenreMovieComponent } from "../pages/genre-movie/genre-movie.component";


export const managementRoutes: Routes = [
    { path: '', component: DashboardComponent,
        children: [
            { path: 'film-management', component: MovieListComponent},
            { path: 'category-management', component: CategoryMovieComponent},
            { path: 'genre-management', component: GenreMovieComponent},
            { path: "user-management", component: UserManagementComponent },
            { path: "banner-management", component: BannerManagementComponent },
            { path: "bill-management", component: BillManagementComponent }
        ]
     }

];
