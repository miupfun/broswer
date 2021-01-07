import {WebviewOptionEntity} from "./webview-option.entity";

export class BrowserTabEntity {
  id: string = '';
  createIndex: number = 0;
  createById: string | null = null;
  title: string = ''
  url: string = ''
  theme: string = ''
  defaultIcon: string = ''
  icon: string = ''
  history: string[] = []
  options: WebviewOptionEntity =new WebviewOptionEntity()
  canGoBack: boolean = false
  canGoForward: boolean = false
}