import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SelectModule } from 'ng2-select';
import { TinymceModule } from 'angular2-tinymce';
import { officeRoutes } from './office-routing.module';
import { OfficeComponent } from "./office.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SelectModule,
    TinymceModule.withConfig({}),
    RouterModule.forChild(officeRoutes),
  ],
  declarations: [
      OfficeComponent
  ]
})
export class OfficeModule {
  public static routes = officeRoutes;
}
