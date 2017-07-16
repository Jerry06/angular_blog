import { Routes } from '@angular/router';
import { OfficeComponent } from './office.component';

export const officeRoutes: Routes = [
  {

    path: '',
    component: OfficeComponent,
    // children: [
    //   {
    //     path: '',
    //     children: [
    //       {path: 'grid', component: AdGridComponent},
    //       {path: 'post', component: AdminHomeComponent},
    //       {path: 'post/:id', component: AdminHomeComponent},
    //       // {path: '', component: AdminComponent}
    //     ]
    //   }
    // ]
  }
];
