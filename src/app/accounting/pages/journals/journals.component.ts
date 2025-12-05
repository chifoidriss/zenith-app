import { Component } from '@angular/core';
import { AlertService } from '../../../shared/services/alert.service';
import { JournalService } from '../../services/journal.service';
import { Paginate } from '../../../shared/models/paginate';
import { AuthService } from '../../../auth/services/auth.service';
import { NewJournalComponent } from './new-journal/new-journal.component';

@Component({
  selector: 'app-journals',
  standalone: false,
  templateUrl: './journals.component.html',
  styleUrls: ['./journals.component.scss']
})
export class JournalsComponent {
  data: Paginate = new Paginate();
  loading = true;

  constructor(
    private alert: AlertService,
    private journalService: JournalService,
    public auth: AuthService,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.journalService.index(response => {
      this.data = response;
      this.loading = false;
    });
  }

  create() {
    this.alert.openModal(NewJournalComponent, (data: any) => {
      this.data.data.push(data);
    });
  }

  edit(index: number, item) {
    this.alert.openModal(NewJournalComponent, (result) => {
      if (result) {
        this.data.data[index] = result;
      }
    }, item);
  }

  remove(index: number, item: any) {
    this.alert.confirm(result => {
      if (result) {
        this.data.data.splice(index, 1);
        if (item.id) {
          this.journalService.destroy(item.id, (response) => {});
        }
      }
    });
  }
}
