import * as Url from 'url';
export class UrlUtil {
  public static format(url: string) {
    url = url.trimLeft()
    if (url.indexOf('://') === -1) {
      url = 'http://' + url
    }
    return url
  }

  public static isUrl(url: string) {
    url = url.trimLeft()
    if (url.indexOf('://') !== -1) {
      return true
    }
    return false
  }

  public static parse(url: string) {
    const parsedUrl = Url.parse(url)
    return parsedUrl
  }
}