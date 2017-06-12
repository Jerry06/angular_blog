import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'blog_widgets',
  template: `
    <div class="col-md-4">
      <blog_search></blog_search>
      <blog_category></blog_category>
      <blog_other_widget></blog_other_widget>   
    </div>
     `
})
export class WidgetsComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
  }

}
