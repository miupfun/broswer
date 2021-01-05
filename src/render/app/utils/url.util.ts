export class UrlUtil {
  public static format(url: string) {
    url = url.trimLeft()
    if (url.indexOf('://') === -1) {
      url = 'http://' + url
    }
    return url
  }
}