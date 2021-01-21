import { Pipe, PipeTransform } from "@angular/core"
import { UrlUtil } from '../../utils/url.util';

@Pipe({
  name: 'mpUrlHost'
})
export class UrlHostPipe implements PipeTransform {
  transform(value: string | undefined): string {
    if (!value) {
      return ''
    }
    const parseResult = UrlUtil.parse(value)
    if (!parseResult) {
      return ''
    }
    return parseResult.hostname || ''
  }
}
