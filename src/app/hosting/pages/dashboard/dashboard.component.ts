import { Component } from '@angular/core';
import {AlertService} from "../../../shared/services/alert.service";

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  dashboard: any[] = [
    {
      name: "101",
      statut: "Libre",
      type: "Standard",
      price: 8000,
      facture: 'payee',
      arrival: '01-02-2002',
      departure: "01-02-2002"
    },
    {
      name: "101",
      statut: "Libre",
      type: "Standard",
      price: 8000,
      facture: 'payee',
      arrival: '01-02-2002',
      departure: "01-02-2002"
    },
    {
      name: "101",
      statut: "Libre",
      type: "Standard",
      price: 8000,
      facture: 'incomplete',
      arrival: '01-02-2002',
      departure: "01-02-2002"
    },
    {
      name: "101",
      statut: "Libre",
      type: "Standard",
      price: 8000,
      facture: 'inpayee',
      arrival: '01-02-2002',
      departure: "01-02-2002"
    }
  ];

  constructor(private alert: AlertService) {
  }

  bookRoom() {
  }

  freeRoom(index) {

  }
}
