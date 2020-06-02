import { Pipe, PipeTransform } from '@angular/core';
import { get as _get } from 'lodash';

@Pipe({
  name: 'ckpGet',
})
export class CkpGetPipe implements PipeTransform {

  transform(data: any, path: string): string {
    return _get(data, path);
  }

}
