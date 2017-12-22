import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'messageFilter'
})
@Injectable()
export class MessagesPipe implements PipeTransform {
  // MessagesPipe
  // Filter messages by name
  transform(messages: any[], search: string): any {
    if (!messages) {
      return;
    } else if (!search) {
      return messages;
    } else {
      let term = search.toLowerCase();
      return messages.filter(message => message.friend.name.toLowerCase().indexOf(term) > -1 || message.friend.username.toLowerCase().indexOf(term) > -1 || message.name.toLowerCase().indexOf(term) > -1);
    }
  }
}