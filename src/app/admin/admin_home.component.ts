import {Component, OnInit, OnDestroy, ViewEncapsulation, Input} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {Blog, Tag} from '../model/blog';
import {BlogService} from '../service/blog.service';

@Component({
  selector: 'my-admin',
  styleUrls: ['./metisMenu.css',
    './sb-admin-2.css',
    './morris.css',
    './font-awesome/css/font-awesome.min.css'
  ],
  templateUrl: './admin_home.component.html',
  encapsulation: ViewEncapsulation.None
})


export class AdminHomeComponent implements OnInit {
  selectedTags: String[] = ['java'];
  blog: Blog = {};
  errorMessage: String;
  isLoading: boolean = true;
  public items: String[] = ['java'];

  // public items:Array<any> = [{id: 54, text: 'Vienna'}, {id: 54, text: 'A'}, {id: 54, text: 'B'}];

  private value: any = ['Athens'];
  private _disabledV: string = '0';
  private disabled: boolean = false;

  private get disabledV(): string {
    return this._disabledV;
  }

  private set disabledV(value: string) {
    this._disabledV = value;
    this.disabled = this._disabledV === '1';
  }

  public selected(value: any): void {
    this.selectedTags.push(value.id);
  }

  public removed(value: any): void {
    let index: number = this.selectedTags.indexOf(value.id);
    if (index !== -1) {
      this.selectedTags.splice(index, 1);
    }
  }

  public refreshValue(value: any): void {
    this.value = value;
  }

  public itemsToString(value: Array<any> = []): string {
    return value
      .map((item: any) => {
        return item.text;
      }).join(',');
  }

  constructor(private blogService: BlogService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.blogService.getTagsStr()
      .subscribe(
        p => this.items = p,
        e => this.errorMessage = e,
        () => this.isLoading = false);

    this.route.params.subscribe(params => {
      this.blogService
        .get(params['id'])
        .subscribe(
          p => {
            this.blog = p;
            this.selectedTags = p.tags.map((t) => t.name);
            //this.content = this.blog.content;
          },
          e => this.errorMessage = e,
          () => this.isLoading = false);
    });
  }

  save() {
    this.blog.tags = this.selectedTags.map((t) => <Tag>({name: t}));
    this.blogService
      .save(this.blog)
      .subscribe(
        data => alert('Ok'),
        err => alert(err.json().message),
        () => console.log('save complete')
      );
  }

  login() {
    this.blogService
      .login1()
      .subscribe(
        data => console.log(data),
        err => console.log(err.json().message),
        () => console.log('login complete')
      );
  }
}

