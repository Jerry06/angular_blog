import { Routes } from "@angular/router";
import { AdminHomeComponent } from "./admin_home.component";
import { AdGridComponent } from "./admin_grid.component";
import { AdminComponent } from "./admin.component";

export const adminRoutes: Routes = [
  {
    // path: '',
    // children: [
    //   {path: 'grid', component: AdGridComponent},
    //   {path: 'post', component: AdminHomeComponent},
    //   {path: 'post/:id', component: AdminHomeComponent},
    //   {path: '', component: AdminComponent}
    // ]

    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        children: [
          {path: 'grid', component: AdGridComponent},
          {path: 'post', component: AdminHomeComponent},
          {path: 'post/:id', component: AdminHomeComponent},
          // {path: '', component: AdminComponent}
        ]
      }
    ]
  }
];

