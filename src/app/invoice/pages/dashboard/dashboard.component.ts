import { Component } from '@angular/core';
import { InvoiceService } from '../../services/invoice.service';
import { AlertService } from '../../../shared/services/alert.service';
import { Chart } from 'chart.js/auto';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  data: any[];
  stats: any;
  loading = true;
  params = {
    form_date: '',
    to_date: '',
    date: 'week',
    source: '',
  }

  chart: Chart;

  constructor(private alert: AlertService,
    private invoiceService: InvoiceService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(result => {
      this.params.source = result['source'];
      this.loading = true;
      this.invoiceService.statistics(response => {
        this.data = response.data;
        this.stats = response.stats;
        // console.log(response);

        this.initChart();
        this.loading = false;
      }, this.params);
    });
  }

  initChart() {
    const ctx: any = document.getElementById('canvas');

    if(ctx) {
      if (this.chart) {
        this.chart.data = this.setData();
        this.chart.update();
      } else {
        this.chart = new Chart(ctx, {
          type: 'line',
          data: this.setData()
        });
      }
    }
  }

  setData() {
    return {
      labels: this.stats.labelsName,
      datasets: [
        {
          label: 'Tendance des factures',
          data: this.stats.values
        },
      ],
    };
  }

  dateFromDay(year, day) {
    const d = new Date(year, 0, day);
    return (d.getDate()<10?'0':'')+d.getDate()+'/'+((d.getMonth()<9?'0':'')+(d.getMonth()+1))+'/'+d.getFullYear();
  }
}
