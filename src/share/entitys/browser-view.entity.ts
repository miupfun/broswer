export class BrowserViewEntity {
  id: string = '';
  url: string = '';
  options: BrowserViewOptions = new BrowserViewOptions()
}

export class BrowserViewOptions {
  nodeApiEnable: boolean = false
}