// import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { AlertService } from '../../shared/services/alert.service';
import { MatDialog } from '@angular/material/dialog';

export const ErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const alert = inject(AlertService);
  const auth = inject(AuthService);
  const dialog = inject(MatDialog);

  // $('.form-control,.form-select').removeClass('is-invalid');
  // $('.invalid-feedback').remove();

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const id = 'error-dialog';
      const dialogExist = dialog.getDialogById(id);

      if (error.status == 0) {
        // alert.openError(error.error.message);
        // auth.lockScreen();
        // loader.stop();
        alert.error({status: error.status, message: "Connexion impossible avec le serveur. \nVérifiez votre connexion au reseau."}, true);
      }
      if (error.status == 401) {
        auth.logout();
        alert.error({status: error.status}, true);
        // alert.openError(error.error.message);
        // auth.lockScreen();
      }
      if (error.status == 403) {
        // alert.openError(error.error.message);
        // auth.lockScreen();
        alert.error({status: error.status}, true);
      }
      if (error.status == 404) {
        alert.error({status: error.status, message: "Aucun résultat trouvé..."}, true);
      }
      if (error.status == 422) {
        // const messages = extractErrorMessagesFromErrorResponse(error);
        // alert.error({status: error.status, message: error.error.message, errors: messages});
        alert.error({status: error.status, message: error.error.message}, true);
      }

      if (error.status == 500) {
        sessionStorage.setItem('error', JSON.stringify(error.error));
        // alert.error({status: error.status, message: "Erreur interne du serveur, veuillez réessayer plus tard..."}, true);
        // router.navigate(['/error-internal-server']);
        alert.error({status: error.status, message: error.error.error}, true);
        console.log(error);
      }
      return throwError(() => {});
    }),
  );
}

export function extractErrorMessagesFromErrorResponse(errorResponse: HttpErrorResponse) {
  // 1 - Create empty array to store errors
  const errors: any[] = [];

  // 2 - check if the error object is present in the response
  if (errorResponse.error) {

    // 3 - Push the main error message to the array of errors
    // errors.push(errorResponse.error.message);

    // 4 - Check for Laravel form validation error messages object
    if (errorResponse.error.errors) {

      // 5 - For each error property (which is a form field)
      for (const property in errorResponse.error.errors) {

        if (errorResponse.error.errors.hasOwnProperty(property)) {
          const elt = $('.form-control#'+ property +',.form-select#'+ property);
          elt.addClass('is-invalid');
          let invalidMessage = '';

          // 6 - Extract it's array of errors
          const propertyErrors: Array<string> = errorResponse.error.errors[property];

          // 7 - Push all errors in the array to the errors array
          propertyErrors.forEach(error => {
            errors.push(error);
            invalidMessage += '<li>'+ error +'</li>';
          });

          const feedBack = `<div class="invalid-feedback mb-5">
                              <ul class="list-unstyled">
                                ${invalidMessage}
                              </ul>
                            </div>`;
          // elt.parent().append(feedBack);
        }
      }
    }
  }
  return errors;
}
