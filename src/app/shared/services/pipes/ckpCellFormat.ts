import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ckpCellFormat',
})
export class CkpCellFormat implements PipeTransform {

  /**
   * This pipe is supposed to be used inside the ckp-table component
   * This allows to pass a custom function in column options to format data
   * @param data data from the table
   * @param callback formatter function, passed as an argument : this function should take a string and return a string
   */
  transform(data: string, callback: Function): string {
    // the case for undefined data has to be handled in the formatter function
    if (!callback) {
      return data;
    }
    try {
      return callback(data);
    } catch {
      return 'Format incorrect';
    }
  }

}
