import { Component, ElementRef, ViewChild, ViewEncapsulation, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { QuillEditorComponent } from 'ngx-quill';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.css']
})
export class TextEditorComponent implements OnInit {

  public breadcrumb: any;
  backgroundColor: any;

  blured = false;
  focused = false;
  hide = false;
  form: FormGroup;
  @ViewChild('editor', { static: true }) editor: QuillEditorComponent;


  constructor(fb: FormBuilder) {
    this.form = fb.group({
      editor: ['']
    });
  }


  ngOnInit() {
    this.form
      .controls
      .editor
      .valueChanges.pipe(
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe((data) => {
      });

    this.editor
      .onContentChanged
      .pipe(
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe((data) => {
      });

    this.breadcrumb = {
      'mainlabel': 'Text-Editor',
      'links': [
        {
          'name': 'Home',
          'isLink': true,
          'link': '/dashboard/sales'
        },
        {
          'name': 'Extra Components',
          'isLink': true,
          'link': '#'
        },
        {
          'name': 'Text-Editor',
          'isLink': false
        }
      ]
    };
  }

  focus() {
    this.focused = true;
    this.blured = false;
  }

  blur() {
    this.focused = false;
    this.blured = true;
  }

  setControl() {
    this.form.setControl('editor', new FormControl('test - new Control'));
  }

  patchValue() {
    this.form.get('editor').patchValue(`${this.form.get('editor').value} patched!`);
  }
}
