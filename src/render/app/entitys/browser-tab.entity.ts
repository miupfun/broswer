import {WebviewOptionEntity} from "./webview-option.entity";

export class BrowserTabEntity {
  id: string = '';
  createIndex: number = 0;
  createById: string | null = null;
  title: string = ''
  url: string = ''
  theme: string = ''
  icon: string = ''
  history: string[] = []
  options: WebviewOptionEntity | undefined
  canGoBack: boolean = false
  canGoForward: boolean = false
}