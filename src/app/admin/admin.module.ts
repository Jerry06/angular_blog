import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminComponent } from "./admin.component";
import { AdminHomeComponent } from "./admin_home.component";
import { AdGridComponent } from "./admin_grid.component";
import { AdMenuComponent } from "./admin_menu.component";
import { FormsModule } from "@angular/forms";
import { AdminDashboardComponent } from "./admin-dashboard.component";
import { adminRoutes } from "./admin-routing.module";
import { RouterModule } from "@angular/router";
import { SelectModule } from "ng2-select";
import { TinymceModule } from "angular2-tinymce";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SelectModule,
    TinymceModule.withConfig({}),
    RouterModule.forChild(adminRoutes),
  ],
  declarations: [
    AdminComponent,
    AdminHomeComponent,
    AdGridComponent,
    AdMenuComponent,
    AdminDashboardComponent
  ]
})
export class AdminModule {
  public static routes = adminRoutes;
}
