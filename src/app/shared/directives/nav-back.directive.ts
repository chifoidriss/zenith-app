import { Directive, HostListener  } from '@angular/core';
import { Location } from '@angular/common';

@Directive({
  selector: '[navBack]',
  standalone: false,
})
export class NavBackDirective {

  constructor(private location: Location) {}

  @HostListener('click')
  onClick(): void {
    this.location.back();
  }
}
