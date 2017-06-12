import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  AfterViewChecked,
  AfterContentChecked,
  ViewChild
} from "@angular/core";
import { Blog } from "../model/blog";
import { BlogService } from "../service/blog.service";
import { ActivatedRoute, Router } from "@angular/router";
import { HighlightJsService } from "angular2-highlight-js";

@Component({
  selector: 'blog-details',
  templateUrl: 'blog_details.component.html',

})
export class BlogDetailComponent implements OnInit, AfterViewInit, AfterViewChecked, AfterContentChecked {
  @ViewChild('fbscript') fbScript;
  blog: Blog;
  errorMessage: String;
  isLoading: boolean = true;
  sampleContent: String = "";

  constructor(private blogService: BlogService,
              private route: ActivatedRoute,
              private router: Router,
              private el: ElementRef,
              private service: HighlightJsService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.blogService
        .get(params['id'])
        .subscribe(
          p => (this.blog = p, this.reloadFB()),
          e => this.errorMessage = e,
          () => this.isLoading = false);
    });
  }

  reloadFB() {
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.text = `
      FB = null;
    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      js = d.createElement(s);
      js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.9&appId=379843209043251";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'))
      `;
    this.fbScript.nativeElement.appendChild(s);
  }

  ngAfterViewInit() {
    // alert('reload');

  }


  ngAfterViewChecked() {

  }

  ngAfterContentChecked() {

  }
}
