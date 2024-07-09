import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { StudentTest} from '../../models/studentTest';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { TestChat } from '../../models/testChat';


@Injectable({
  providedIn: 'root'
})
export class TestChatService  {
 
    private dbPath = 'messages';
    //testChat:TestChat;
    testChatRef: AngularFirestoreCollection<TestChat>;
  tutorials: unknown;
   
    constructor(private db: Firestore) {
       // super(db, "");
      //this.testChatRef = db.collection(this.dbPath);
     
    }
  
    getAll(): AngularFirestoreCollection<TestChat> {
      return this.testChatRef;
    }
  
      create(testChat: TestChat): any {
        const collectionInstance = collection(this.db,'messages');
        addDoc(collectionInstance,testChat)
        .then(()=>{
        
      })
      .catch((err)=>{
         
      //return this.testChatRef.add({ ...testChat });
      })
    }

    update(id: string, data: any): Promise<void> {
      return this.testChatRef.doc(id).update(data);
    }
  
    delete(id: string): Promise<void> {
      return this.testChatRef.doc(id).delete();
    }
}
