import { Component, OnInit } from '@angular/core';
import { NewChartAccountComponent } from './new-chart-account/new-chart-account.component';
import { AlertService } from '../../../shared/services/alert.service';
import { Paginate } from '../../../shared/models/paginate';
import { ChartAccountService } from '../../services/chart-account.service';


@Component({
  selector: 'app-chart-account',
  standalone: false,
  templateUrl: './chart-account.component.html',
  styleUrls: ['./chart-account.component.scss']
})
export class ChartAccountComponent implements OnInit {
  data: Paginate = new Paginate();
  loading = true;

  constructor(
    private alert: AlertService,
    private chartAccountService: ChartAccountService,
  ) {}

  ngOnInit(): void {
    this.getChartAccount();
  }

  create() {
    this.alert.openModal(NewChartAccountComponent, (data: any) => {
      this.data.data.push(data);
    });
  }

  getChartAccount(code = 1) {
    this.loading = true;
    this.chartAccountService.index((response: any) => {
      this.data = response;
      this.loading = false;
      // console.log(response);
    }, code);
  }

  deprecated_and_allow(method:any,id:any){
    const formData = new FormData();

    formData.append('method', method);

    this.chartAccountService.deprecated_and_allow(id,formData, (data:any)=>{
      // console.log(data);
    });
  }

  update(chart_account:any, index: number){
    this.alert.openModal(NewChartAccountComponent, (data: any) => {
      this.data.data[index] = data;
    }, chart_account);
  }

  filterAccount(event) {
    const val = $(event.target).val() || 1;
    this.getChartAccount(+val);
  }
}
