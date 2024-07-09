import { Component, Input, ViewChild } from '@angular/core';
import { TestService } from 'src/app/core/services/shared/test.service';
import { ToolbarService, ContextMenuService, EditorService, DocumentEditorContainerComponent } from '@syncfusion/ej2-angular-documenteditor';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'word-preview',
  templateUrl: './word-preview.component.html',
  styleUrls: ['./word-preview.component.css'],
  providers: [ToolbarService, ContextMenuService, EditorService]
})
export class WordPreviewComponent {
  @ViewChild('documentEditor') container: DocumentEditorContainerComponent;
  @Input() testId: string;
  serviceLink: string;

  constructor(
    private testService: TestService,
  ) { }

  ngOnInit(): void {
     
    //if(!this.testId)return; 
    //if(this.testId == 'test-upload')return; 
    //if(this.testId typeof() undefined)
    this.serviceLink = `${environment.syncfusionHostedWordUrl}`;
    this.testService.getUrl(`${this.testId}/get-answer-file`)
    //check testId here its causing an exception
      .subscribe((data) => {
       
        this.loadDocument(data); 
        //this.container.documentEditor.enableEditor = false; 
         
      })
  }

  private loadDocument(documentBase64: string): void {
    try {
      //this.container.documentEditor.enableTablePropertiesDialog = false;
      //this.container.documentEditor.enableEditor = false; 
      this.container.documentEditor.enableSpellCheck = false; 
      this.container.documentEditor.open(documentBase64);
 
    } catch (error) {
      console.error('Failed to decode base64 string:', error);
    }
  }
}
