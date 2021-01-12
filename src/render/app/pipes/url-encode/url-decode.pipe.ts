import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'mpUrlDecode'
})
export class UrlDecodePipe implements PipeTransform {
  transform(value: string | undefined): string {
    if (value) {
      return decodeURIComponent(value)
    }
    return ''
  }
}
