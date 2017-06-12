import { Component } from '@angular/core';
@Component({
  template: `
    <div id="wrapper">
      <ad-menu></ad-menu>
      <router-outlet></router-outlet>
    </div>
  `
})
export class AdminComponent {
}
