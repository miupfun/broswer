import {WebviewOptionEntity} from "./webview-option.entity";

export class BrowserTabEntity {
  id: string = '';
  title: string = ''
  url: string = ''
  theme: string = ''
  icon: string = ''
  history: string[] = []
  options: WebviewOptionEntity | undefined
}