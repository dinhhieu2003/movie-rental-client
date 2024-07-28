import { Routes } from "@angular/router";
import { DashboardComponent } from "../pages/dashboard/dashboard.component";
import { MovieListComponent } from "../pages/movie-list/movie-list.component";
import { UserManagementComponent } from "../pages/user-management/user-management.component";
import { BillManagementComponent } from "../pages/bill-management/bill-management.component";


export const managementRoutes: Routes = [
    {   path: "", component: DashboardComponent, 
        children:[
            {path: "user-management", component: UserManagementComponent},
            {path: "bill-management", component: BillManagementComponent}
        ]
    } ,  
   
]