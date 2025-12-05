import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price',
  standalone: false,
})
export class PricePipe implements PipeTransform {

  transform(value: any, currency: string = ' XAF', ...args: number[]): string {
    // const currency = ' F CFA';
    // const currency = ' XAF';
    const amount = Math.round(value) || 0;
    return new Intl.NumberFormat('fr-FR').format(amount) + currency;
  }
}
