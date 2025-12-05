import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map, switchMap, timer } from 'rxjs';
import { APP_API_URL } from '../../../env';


export class AppValidators {
  static http: HttpClient;

  static cannotContainSpace(control: AbstractControl) : ValidationErrors | null {
    if((control.value as string).indexOf(' ') >= 0){
      return {cannotContainSpace: true}
    }
    return null;
  }

  private static checkEmailExists(table: string, column: string, ignoreRow: string = '', value: string): Observable<boolean> {
    const params = new HttpParams({
      fromObject: {
        table: table,
        value: value,
        column: column,
        ignoreRow: ignoreRow
      }
    });
    return AppValidators.http.get<boolean>(`${APP_API_URL}validators/exists`, {params: params});
  }

  static exists(table: string, column: string, ignoreRow: string = ''): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
      return timer(500).pipe(
        switchMap(() => this.checkEmailExists(table, column, ignoreRow, control.value)),
        map(exists => (exists ? { emailExists: true } : null))
      );
    };
  }
}
