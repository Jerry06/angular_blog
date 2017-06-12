import {Component, OnInit} from '@angular/core';
import {Router, NavigationExtras} from "@angular/router";

@Component({
  selector: 'blog_search',
  templateUrl: 'blog_search.component.html',
})
export class SearchComponent implements OnInit {

  searchText: string;

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  onEnter(value: string) {
    this.searchText = value;
    this.search();
  }

  search() {
    if (this.searchText.trim()) {

      let navigationExtras: NavigationExtras = {
        queryParams: {'search': this.searchText.trim()}
      };

      // Navigate to the login page with extras
      this.router.navigate(['/blog'], navigationExtras);
    }
  }

}
