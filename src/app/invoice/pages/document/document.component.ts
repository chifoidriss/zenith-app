import { Component } from '@angular/core';
import { AlertService } from '../../../shared/services/alert.service';
import { EditSocietyComponent } from './edit-society/edit-society.component';
import { SocietyService } from '../../services/society.service';

@Component({
  selector: 'app-document',
  standalone: false,
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent {
  society: any;

  constructor(private alert: AlertService,
    private societyService: SocietyService,) {}

  ngOnInit() {
    this.societyService.show(1, (response) => {
      this.society = response;
      console.log(response);
    });
  }

  editSociety() {
    this.alert.openModal(EditSocietyComponent, (data) => {
      this.society = data;
    }, this.society);
  }
}
