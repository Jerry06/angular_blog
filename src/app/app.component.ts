/**
 * Angular 2 decorators and services
 */
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { AppState } from "./app.service";
import { saveAs } from 'file-saver';

/**
 * App Component
 * Top Level Component
 */
declare var test: any;

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css'
  ],
  template: `
      <router-outlet></router-outlet>
      <h1>
        <button (click)='f()'>Test</button>
      </h1>
  `,
})
export class AppComponent implements OnInit {

  constructor(public appState: AppState) {
  }
  f(){
    let file = new Blob(['hello world'], { type: 'text/csv;charset=utf-8' });
    saveAs(file, 'helloworld.docx');
  }
  public ngOnInit() {

  }

}
