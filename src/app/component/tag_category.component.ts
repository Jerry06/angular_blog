import {Component, OnInit} from '@angular/core';
import {BlogService} from "../service/blog.service";
import {Tag} from "../model/blog";

@Component({
  selector: 'blog_category',
  templateUrl: './tag_category.component.html',
})

export class TagCategoryComponent implements OnInit {

  tags: Tag[];
  errorMessage: String;
  isLoading: boolean = true;

  constructor(private blogService: BlogService) {
  }

  ngOnInit(): void {
    this.blogService.getTags().subscribe(
      p => this.tags = p,
      e => this.errorMessage = e,
      () => this.isLoading = false);
  }


}
