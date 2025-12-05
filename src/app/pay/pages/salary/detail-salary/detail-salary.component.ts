import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SalaryService } from '../../../../pay/services/salary.service';
import { RestService } from '../../../../shared/services/rest.service';

@Component({
  selector: 'app-detail-salary',
  standalone: false,
  templateUrl: './detail-salary.component.html',
  styleUrls: ['./detail-salary.component.scss']
})
export class DetailSalaryComponent {
  loading = true;
  salary: any;

  constructor(public dialogRef: MatDialogRef<DetailSalaryComponent>,
    private salaryServie: SalaryService,
    private restService: RestService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.salaryServie.show(this.data.id, response => {
      this.salary = response;
      this.loading = false;
    });
  }

  print() {
    this.restService.printToPDF('salary', this.data.id);
  }
}
