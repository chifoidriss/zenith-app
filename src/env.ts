// export const APP_API_BASE_URL = 'https://zenith-api.dev';

import { isDevMode } from "@angular/core";

// export const APP_API_BASE_URL = `http://${location.hostname}:9000`;
export const APP_API_BASE_URL = isDevMode() ? 'http://localhost:9000' : getURL();


export const APP_NAME = 'Zénith Hotel';
export const APP_API_URL = APP_API_BASE_URL+'/api/';

export class Menu {
  name: string;
  icon: string;
  link: string;
  links: {
    name: string;
    link: string;
  } [] = [];
  permissions: string|string[];
}

export const MENU: Menu[] = [
  {
    name: 'Hébergement',
    icon: 'mdi mdi-hospital-building',
    // link: '/hosting',
    link: '/invoicing/dashboard/hosting',
    links: [
      {
        name: 'Tableau de bord',
        link: '/invoicing/dashboard/hosting'
      },
      {
        name: 'Main courante',
        link: '/hosting/day-book'
      },
      {
        name: 'Facturation',
        link: '/invoicing/invoices/hosting'
      },
      {
        name: 'Paiements',
        link: '/invoicing/payments/hosting'
      },
      {
        name: 'Chambres',
        link: '/hosting/rooms'
      },
    ],
    permissions: 'HOSTING_R'
  },
  {
    name: 'Clients',
    icon: 'mdi mdi-clipboard-account-outline',
    link: '/partners/clients',
    links: [],
    permissions: ['HOSTING_R','BAR_R','RESTAURANT_R']
  },
  {
    name: 'Bar',
    icon: 'mdi mdi-glass-wine',
    link: '/invoicing/dashboard/bar',
    links: [
      {
        name: 'Statistiques',
        link: '/invoicing/dashboard/bar'
      },
      {
        name: 'Factures',
        link: '/invoicing/invoices/bar'
      },
      {
        name: 'Paiements',
        link: '/invoicing/payments/bar'
      },
      {
        name: 'Commandes',
        link: '/stocking/transfers/bar'
      },
      {
        name: 'Boissons',
        link: '/bar/articles'
      },
    ],
    permissions: 'BAR_R'
  },
  {
    // name: 'Restaurant & Cuisine',
    name: 'Restaurant',
    icon: 'mdi mdi-silverware-fork-knife',
    link: '/invoicing/dashboard/restaurant',
    links: [
      {
        name: 'Tableau de bord',
        link: '/invoicing/dashboard/restaurant'
      },
      {
        name: 'Factures',
        link: '/invoicing/invoices/restaurant'
      },
      {
        name: 'Paiements',
        link: '/invoicing/payments/restaurant'
      },
      {
        name: 'Menu',
        link: '/restaurant/menus'
      },
      {
        name: 'Commandes',
        link: '/stocking/transfers/restaurant'
      },
    ],
    permissions: 'RESTAURANT_R'
  },
  {
    name: 'Articles',
    icon: 'mdi mdi-tag-outline',
    link: '/articles',
    links: [
      {
        name: 'Statistiques',
        link: '/articles/dashboard'
      },
      {
        name: 'Articles',
        link: '/articles'
      },
      {
        name: 'Catégories',
        link: '/articles/categories'
      },
      {
        name: 'Unités de mesures',
        link: '/articles/units'
      },
    ],
    permissions: 'ARTICLE_R'
  },
  {
    name: 'Stock',
    icon: 'mdi mdi-warehouse',
    link: '/stocking/stocks',
    links: [
      // {
      //   name: 'Opérations',
      //   link: '/stocking/operations'
      // },
      {
        name: 'Transferts',
        link: '/stocking/transfers'
      },
      {
        name: 'Entrepôts',
        link: '/stocking/warehouses'
      },
      {
        name: 'Stocks',
        link: '/stocking/stocks'
      },
    ],
    permissions: 'STOCKING_R'
  },
  {
    name: 'Achats',
    icon: 'mdi mdi-purse-outline',
    link: '/invoicing/dashboard/suppliers',
    links: [
      {
        name: 'Tableau de bord',
        link: '/invoicing/dashboard/suppliers'
      },
      {
        name: 'Factures d\'achats',
        link: '/invoicing/invoices/suppliers'
      },
      {
        name: 'Paiements d\'achats',
        link: '/invoicing/payments/suppliers'
      },
      {
        name: 'Fournisseurs',
        link: '/partners/suppliers'
      },
    ],
    permissions: 'PURCHASE_R'
  },
  {
    name: 'Paie & RH',
    icon: 'mdi mdi-account-credit-card-outline',
    link: '/invoicing/dashboard/pay',
    links: [
      {
        name: 'Tableau de bord',
        link: '/invoicing/dashboard/pay'
      },
      {
        name: 'Absences',
        link: '/paying/absences'
      },
      {
        name: 'Congés',
        link: '/paying/leaves'
      },
      {
        name: 'Prêts',
        link: '/paying/loans'
      },
      {
        name: 'Acomptes sur salaire',
        link: '/paying/advances'
      },
      // {
      //   name: 'Départements',
      //   link: '/paying/departments'
      // },
      {
        name: 'Postes',
        link: '/paying/posts'
      },
      {
        name: 'Contrats',
        link: '/paying/contracts'
      },
      {
        name: 'Salaires',
        link: '/paying/salaries'
      },
      // {
      //   name: 'Motifs de renvoi',
      //   link: '/paying/reason-leavings'
      // },
      // {
      //   name: 'Factures des employés',
      //   link: '/invoicing/invoices/salaries'
      // },
      {
        name: 'Paiements employés',
        link: '/invoicing/payments/salaries'
      },
      {
        name: 'Employés',
        link: '/partners/salaries'
      },
    ],
    permissions: 'PAY_RH_R'
  },
  {
    name: 'Comptabilité',
    icon: 'mdi mdi-chart-box-outline',
    link: '/accounting/entries',
    links: [
      // {
      //   name: 'Tableau de bord',
      //   link: '/accounting'
      // },
      {
        name: 'Grand livre',
        link: '/accounting/entries'
      },
      {
        name: 'Factures',
        link: '/invoicing/invoices/entries'
      },
      {
        name: 'Paiements',
        link: '/invoicing/payments/entries'
      },
      {
        name: 'Rapport de suivi',
        link: '/invoicing/followup/all'
      },
      // {
      //   name: 'Journaux',
      //   link: '/accounting/journals'
      // },
      {
        name: 'Plan comptable',
        link: '/accounting/chart-accounts'
      },
    ],
    permissions: 'ACCOUNTING_R'
  },
  {
    name: 'Paramètres',
    icon: 'mdi mdi-tune-variant',
    link: '/invoicing/documents',
    // link: '/settings',
    links: [
      // {
      //   name: 'Paramètres généraux',
      //   link: '/invoicing/settings'
      // },
      {
        name: 'Configurer les documents',
        link: '/invoicing/documents'
      },
      {
        name: 'Taxes et impôts',
        link: '/invoicing/taxes'
      },
      {
        name: 'Méthode de paiements',
        link: '/invoicing/payment-methods'
      },
      {
        name: 'Devises',
        link: '/invoicing/devises'
      },
    ],
    permissions: 'SETTING_R'
  },
]

export const APP = [];

export function getURL() {
  // if (window.location.hostname.startsWith('localhost:4200')) {
  //   return 'https://zenith-api.dev';
  // }
  // return window.location.protocol + '//' + window.location.hostname + ':9000';
  return window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
}
