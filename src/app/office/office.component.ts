import { Component } from '@angular/core';
import { saveAs } from 'file-saver';

@Component({
  templateUrl: './office.component.html'
})
export class OfficeComponent {
  file: File;

  onChange(event) {
    let files = event.srcElement.files;
    this.file = files[0];
    console.log(files);


    var blob = new Blob(['yourBinaryDataAsAnArrayOrAsAString'], {type: "application/octet-stream"});
    var fileName = "myFileName.myExtension";
    // saveAs(blob, fileName);
  }

  save(event) {
    // let file = new Blob(['hello world'], { type: 'text/csv;charset=utf-8' });
    saveAs(this.file, 'helloworld.docx');
  }
}
