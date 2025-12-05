import { Component } from '@angular/core';
import { AlertService } from '../../../shared/services/alert.service';
import { ContractService } from '../../services/contract.service';
import { Paginate } from '../../../shared/models/paginate';
import { NewContractComponent } from './new-contract/new-contract.component';
import { ContractTypeComponent } from './contract-type/contract-type.component';
import { IndemnityComponent } from '../indemnity/indemnity.component';
import { BonusComponent } from '../bonus/bonus.component';

@Component({
  selector: 'app-contract',
  standalone: false,
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss']
})
export class ContractComponent {
  data: Paginate = new Paginate();
  loading = true;

  constructor(private alert: AlertService,
    private contractService: ContractService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.contractService.index(response => {
      this.data = response;
      this.loading = false;
    });
  }

  addItem() {
    this.alert.openModal(NewContractComponent, (result) => {
      if (result) {
        this.data.data.push(result);
      }
    });
  }

  addContractType() {
    this.alert.openModal(ContractTypeComponent, (result) => {
      // if (result) {
      //   this.data.data.push(result);
      // }
    }, null, "xl");
  }

  addBonus() {
    this.alert.openModal(BonusComponent, (result) => {
    }, null, "xl");
  }

  addIndemnity() {
    this.alert.openModal(IndemnityComponent, (result) => {
    }, null, "xl");
  }

  removeItem(index: number, item: any) {
    this.alert.confirm(result => {
      if (result) {
        this.data.data.splice(index, 1);
        if (item.id) {
          this.contractService.destroy(item.id, (response) => {});
        }
      }
    });
  }

  editItem(index: number, item: any) {
    this.alert.openModal(NewContractComponent, (result) => {
      if (result) {
        this.data.data[index] = result;
      }
    }, item);
  }
}
