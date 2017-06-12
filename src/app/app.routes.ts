import { Routes } from "@angular/router";
import { HomeComponent } from "./home";
import { AboutComponent } from "./about";
import { NoContentComponent } from "./no-content";
import { BlogListComponent } from "./component/blog_list.component";
import { BlogDetailComponent } from "./component/blog_details.component";

export const ROUTES: Routes = [
  { path: '',      component: BlogListComponent },
  { path: 'about', component: AboutComponent },
  { path: 'blog', component: BlogListComponent },
  { path: 'blog/:id', component: BlogDetailComponent },
  { path: 'tag/:name', component: BlogListComponent },
  { path: 'admin', loadChildren: './admin#AdminModule'},
  { path: '**',    component: NoContentComponent },
];
