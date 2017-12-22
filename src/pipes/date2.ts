import { Injectable, Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'Date2Format'
})
@Injectable()
export class Date2FormatPipe implements PipeTransform {
  // DateFormatPipe
  // Show moment.js dateFormat for time elapsed.
  transform(date: any, args?: any): any {
    return moment(new Date(date)).fromNow();
  }
}
