import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertConfirmComponent } from '../components/alert-confirm/alert-confirm.component';
import { APP_NAME } from '../../../env';
import { AlertErrorComponent } from '../components/alert-error/alert-error.component';
import { DetailArticleComponent } from '../../article/pages/index-article/detail-article/detail-article.component';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  appName = APP_NAME;

  constructor(private snackBar: MatSnackBar,
  	private dialog: MatDialog) { }

  message(text: string) {
    this.snackBar.open(text, 'OK');
  }

  confirm(callback?: any, data?:any) {
    this.dialog.open(AlertConfirmComponent, {
      data: data
    }).afterClosed().subscribe((result: boolean) => {
      if (result) {
        callback(result);
      }
    });
  }

  openModal(component: any, callback?: any, data?: any, size: 'sm'|'md'|'xl'|'full' = 'md') {
    let large = '';
    let height = 'none';

    if (size == 'sm') {
      large = '400px';
    } else if(size == 'md') {
      large = '550px';
    } else if(size == 'xl') {
      large = '760px';
    } else {
      large = '920px';
      height = '90vh';
    }

    this.dialog.open(component, {
      closeOnNavigation: false,
      disableClose: true,
      width: large,
      maxWidth: 'none',
      // minHeight: height,
      data: data,
      hasBackdrop: true,
      // position: {
      //   top: '46px',
      // },
    }).afterClosed().subscribe(result => {
      if (result) {
        callback(result);
      }
    });
  }

  error(data: any, centered: boolean = false) {
    this.dialog.open(AlertErrorComponent, {
      maxWidth: '350px',
      hasBackdrop: false,
      closeOnNavigation: true,
      // disableClose: false,
      position: {
        top: '1rem',
        right: '1rem',
      },
      data: data
    });
  }

  detailArticle(id: number) {
    this.openModal(DetailArticleComponent, (data) => {}, {id: id});
  }
}
