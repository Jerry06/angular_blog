import {Component, OnInit, OnDestroy, ViewEncapsulation, Input} from '@angular/core';
import {BlogService} from "../service/blog.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PaginationPage} from "../model/pagination";
import {Blog} from "../model/blog";

@Component({
  selector: 'ad-menu',
  styleUrls: ['./metisMenu.css',
    './sb-admin-2.css',
    './morris.css',
    './font-awesome/css/font-awesome.min.css'
  ],
  templateUrl: './admin_menu.component.html',
})
export class AdMenuComponent implements OnInit, OnDestroy {

  sub: any;
  errorMessage: string = '';
  isLoading: boolean = true;
  page: PaginationPage<Blog>;
  constructor(private blogService: BlogService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.sub = this.route.queryParams.subscribe(params => {
      let pageNum: number = 0;
      let pageSize: number = 99999;
      this.blogService
        .getPage(pageNum, pageSize, null, null)
        .subscribe(
          p => this.page = p,
          e => this.errorMessage = e,
          () => this.isLoading = false);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
