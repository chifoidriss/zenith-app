import { Component } from '@angular/core';
import { Paginate } from '../../../shared/models/paginate';
import { AlertService } from '../../../shared/services/alert.service';
import { NewAbsenceComponent } from './new-absence/new-absence.component';
import { AbsenceService } from '../../services/absence.service';

@Component({
  selector: 'app-absence',
  standalone: false,
  templateUrl: './absence.component.html',
  styleUrls: ['./absence.component.scss']
})
export class AbsenceComponent {
  data: Paginate = new Paginate();
  loading = true;

  constructor(private alert: AlertService,
    private absenceService: AbsenceService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.absenceService.index(response => {
      this.data = response;
      this.loading = false;
    });
  }

  addItem() {
    this.alert.openModal(NewAbsenceComponent, (result) => {
      if (result) {
        this.data.data.push(result);
      }
    });
  }

  removeItem(index: number, item: any) {
    this.alert.confirm(result => {
      if (result) {
        this.data.data.splice(index, 1);
        if (item.id) {
          this.absenceService.destroy(item.id, (response) => {});
        }
      }
    });
  }

  editItem(index: number, item: any) {
    this.alert.openModal(NewAbsenceComponent, (result) => {
      if (result) {
        this.data.data[index] = result;
      }
    }, item);
  }
}
