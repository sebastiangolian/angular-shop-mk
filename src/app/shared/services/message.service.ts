import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Message } from '../interfaces/message.interface';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class MessageService {
    private subject = new Subject<Message>();

    sendMessage(message: string, type: string = "success", dismissible: boolean = environment.messageDismissible, timeout: number = 0) {
        if(timeout == 0) {
            switch(type) { 
                case "success": { 
                    timeout = 3000
                    break; 
                } 
                case "info": { 
                    timeout = 2000
                    break; 
                }  
                default: { 
                    timeout = 10000 
                    break;              
                } 
             }
        }

        this.subject.next({ text: message, type: type, dismissible: dismissible, timeout: timeout });
    }

    clearMessages() {
        this.subject.next(null);
    }

    getMessage(): Observable<Message> {
        return this.subject.asObservable();
    }
}