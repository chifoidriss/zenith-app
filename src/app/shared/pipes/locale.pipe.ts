import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'locale',
  standalone: false,
})
export class LocalePipe implements PipeTransform {
  constructor(private datePipe: DatePipe) {}

  transform(value: string, ...args: any[]): string | null {
    if(value) {
      if(value.includes(':')) {
        return this.datePipe.transform(value, 'dd/MM/yyyy à HH:mm');
      }
      return this.datePipe.transform(value, 'dd/MM/yyyy');
    }
    return '';
  }

}
