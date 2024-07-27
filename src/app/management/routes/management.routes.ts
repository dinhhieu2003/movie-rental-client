import { Routes } from "@angular/router";
import { DashboardComponent } from "../pages/dashboard/dashboard.component";
import { MovieListComponent } from "../pages/movie-list/movie-list.component";
import { CategoryMovieComponent } from "../pages/category-movie/category-movie.component";

export const managementRoutes: Routes = [
    { path: '', component: DashboardComponent,
        children: [
            { path: 'film-management', component: MovieListComponent},
            { path: 'category-management', component: CategoryMovieComponent},
        ]
     }

];