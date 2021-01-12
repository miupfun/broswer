import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'mpUrlEncode'
})
export class UrlEncodePipe implements PipeTransform {

  transform(value: string): string {
    return encodeURIComponent(value)
  }

}
