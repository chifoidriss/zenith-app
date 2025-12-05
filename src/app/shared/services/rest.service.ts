import { FormGroup } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APP_API_URL } from '../../../env';
import * as XLSX from 'xlsx';
// import * as FileSaver from 'file-saver';
// import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }

  getData(urlLink: string, callback: any, param?: any) {
    const url = urlLink.split('?page=')[0]
    const page = urlLink.split('?page=')[1]
    const params = new HttpParams({
      fromObject: {...param, ...{page: page}}
    });

    // console.log(url, urlLink, params);

    this.http.get(url, {params: params}).subscribe((response) => {
      callback(response);
    });
  }

  getSociety() {
    this.http.get(APP_API_URL+'header').subscribe((response) => {
      console.log(response);
    });
  }

  asFormData(form: FormGroup | any): FormData {
    const formData = new FormData();
    let formValues;

    if(form instanceof FormGroup) {
      formValues = form.value;
    } else {
      formValues = form;
    }

    for (const key in formValues) {
      if (Object.prototype.hasOwnProperty.call(formValues, key)) {
        const element = formValues[key];
        formData.append(key, element||'');
      }
    }
    return formData;
  }

  tableToExcel(reference: string, fileName: string) {
    // /* table id is passed over here */
    let element = document.getElementById(reference);
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    // /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // /* save to file */
    XLSX.writeFile(wb, fileName+'.xlsx');
  }

  jsonToExcel(data: any[], fileName: string) {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);

    // /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // /* save to file */
    XLSX.writeFile(wb, fileName+'.xlsx');
  }

  printToPDF(type: string, id: string, callback?: any) {
    $('.loader-printer').removeClass('d-none');
    this.http.get(APP_API_URL + `print/${type}/${id}`).subscribe({
      next :(response: any) => {
        // const downloadURL = window.URL.createObjectURL(response);
        // const link = document.createElement('a');
        // link.href = downloadURL;
        // link.click();

        // saveAs(response);
        // saveAs(response, 'help.pdf', { autoBom: false });

        $('.pdf-viewer .viewer').attr('src', response.url);
        $('.pdf-viewer').show(300);

        $('.loader-printer').addClass('d-none');
        callback(response);
      },
      error: () => {
        $('.loader-printer').addClass('d-none');
      }
    });
  }
}
