import { Directive, HostListener  } from '@angular/core';
import { Location } from '@angular/common';

@Directive({
  selector: '[navNext]',
  standalone: false,
})
export class NavNextDirective {

  constructor(private location: Location) {}

  @HostListener('click')
  onClick(): void {
    this.location.forward();
  }

}
