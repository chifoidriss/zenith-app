import { Paginate } from '../../models/paginate';
import { RestService } from './../../services/rest.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: false,
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() data: Paginate = new Paginate();
  @Input() params: any;
  @Output() onPageEvent = new EventEmitter<any>();

  constructor(private rest: RestService) { }

  ngOnInit(): void {
  }

  onPage(urlLink: string) {
    if (urlLink) {
      this.rest.getData(urlLink, (response: any) => {
        // Scroll to Top
        window.scrollTo({top: 0, behavior: 'smooth'});

        this.onPageEvent.emit(response);
      }, this.params);
    }
  }
}
