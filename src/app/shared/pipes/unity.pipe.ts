import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unity',
  standalone: false,
})
export class UnityPipe implements PipeTransform {

  transform(value: number, ...unit: any[]): string|number {
    return Math.ceil(value);
  }

}
