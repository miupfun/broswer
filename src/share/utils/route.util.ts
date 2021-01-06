import * as Path from "path";

export class RouteUtil {
  public static getRendererUrl(): string {
    return process.env.$RENDER as string
  }

  public static getStaticPath(): string {
    return Path.resolve(process.env.$STATIC as string)
  }

  public static getAssetsPath(): string {
    return Path.join(this.getStaticPath(), 'assets')
  }

  public static getPageUrl(page: string = '', useHash: boolean = true):string {
    return `${this.getRendererUrl()}${useHash ? '#/' : '/'}${page}`
  }
  
  public static isLocalUrl(url:string):boolean{
    return url.startsWith(this.getRendererUrl())
  }
}