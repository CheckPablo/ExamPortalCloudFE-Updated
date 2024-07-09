import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatsComponent } from './chats.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ChatService } from 'src/app/_api/chat/chat.service';
import { StaticChatComponent } from './static-chat/static-chat.component';
import { ApplicationApiService } from 'src/app/_services/application-api.service';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    ToastrModule.forRoot(),
    PerfectScrollbarModule,
    RouterModule.forChild([
      {
        path: '',
        component: ChatsComponent
      },
      {
        path: 'static-chat',
        component: StaticChatComponent
      }
    ])
  ],
  declarations: [ChatsComponent, StaticChatComponent],
  providers: [ChatService, ApplicationApiService]
})
export class ChatsModule { }
