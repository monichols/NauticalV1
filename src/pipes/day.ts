import { Injectable, Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'DayFormat'
})
@Injectable()
export class DayFormatPipe implements PipeTransform {
  // DateFormatPipe
  // Show moment.js dateFormat for time elapsed.
  transform(date: any, args?: any): any {
    return moment(date).format('dddd MMMM Do,YYYY');
  }
}