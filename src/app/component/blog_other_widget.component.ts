import { Component, OnInit } from '@angular/core';
import { HighlightJsService } from "angular2-highlight-js";
@Component({
  selector: 'blog_other_widget',
  templateUrl: './blog_other_widget.component.html'
})
export class OtherWidgetComponent implements OnInit {
  content: string;

  constructor(private service: HighlightJsService) {
    this.content = `
    <pre><code class="typescript highlight">
    Object someThing = learnSomeThing();
    while (someThing.isNotClear()){
        google();
        .......
        run();
    }
    write(someThing);
    </code></pre>
`;
  }

  ngOnInit() {
  }
}

