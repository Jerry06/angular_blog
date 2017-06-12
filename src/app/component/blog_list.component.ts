import {Component, OnInit, OnDestroy} from '@angular/core';
import {Blog} from '../model/blog';
import {BlogService} from '../service/blog.service';
import {PaginationPage} from "../model/pagination";
import {ActivatedRoute, Router, NavigationEnd} from "@angular/router";
import {Subscription, Observable} from 'rxjs/Rx';

@Component({
  selector: 'blog-list',
  templateUrl: './blog_list.component.html',
})

export class BlogListComponent implements OnInit, OnDestroy {

  routerSubscription: Subscription;
  sub: any;
  page: PaginationPage<Blog>;
  errorMessage: string = '';
  isLoading: boolean = true;
  searching: boolean = false;

  constructor(private blogService: BlogService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    var obsComb = this.route.params.combineLatest(this.route.queryParams,
      (params, qparams) => ({params, qparams}));

    obsComb.subscribe(ap => {
        let search: string = ap.qparams['search'];
        if (search) {
          this.searching = true;
          this.blogService
            .search(search)
            .subscribe(
              p => this.page = p,
              e => this.errorMessage = e,
              () => this.isLoading = false);
        }
        else {
          this.searching = false;
          let pageNum: number;
          let pageSize: number;
          pageNum = Number.parseInt(ap.qparams['page']) || 0;
          pageSize = Number.parseInt(ap.qparams['size']) || 4;
          this.blogService
            .getPage(pageNum, pageSize, ap.params['name'], null)
            .subscribe(
              p => this.page = p,
              e => this.errorMessage = e,
              () => this.isLoading = false);
        }
      }
    );

    // var obsComb = this.route.params.combineLatest(this.route.queryParams,
    //   (params, qparams) => {
    //     let pageNum: number = 0 ;
    //     let pageSize: number = 2;
    //     pageNum = Number.parseInt(qparams['page']) || 0;
    //     pageSize = Number.parseInt(qparams['size']) || 2;
    //     let tag: string = params['tag'];
    //     console.info("ap qparams " + qparams);
    //     console.info("ap params " + params);
    //     console.info("ap.params is " + params[0]);
    //     console.info("tag is " + tag);
    //     this.blogService
    //       .getPage(pageNum, pageSize, tag, null)
    //       .subscribe(
    //         p => this.page = p,
    //         e => this.errorMessage = e,
    //         () => this.isLoading = false);
    //
    //   });

    // this.routerSubscription = this.router.events
    //   .filter(event => event instanceof NavigationEnd)
    //   .subscribe(event => {
    //     document.body.scrollTop = 0;
    //   });
  }

  ngOnDestroy() {

  }

}
