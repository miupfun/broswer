import {WebviewOptionEntity} from "./webview-option.entity";

export class BrowserTabEntity {
  title: string = ''
  url: string = ''
  theme: string | undefined = ''
  icon: string | undefined = ''
  history: string[] = []
  options: WebviewOptionEntity | undefined
}