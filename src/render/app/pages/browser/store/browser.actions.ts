import {BrowserTabEntity} from "../../../entitys/browser-tab.entity";

export class BrowserActionsCreateTab {
  static readonly type = '[browser] BrowserActionsCreateTab';

  constructor(public tabIndex?: number, public url?: string) {
  }
}

export class BrowserActionsUpdateTab {
  static readonly type = '[browser] BrowserActionsUpdateTab'

  constructor(public index: number, public tabInfo: Partial<BrowserTabEntity>) {
  }
}

export class BrowserActionsSelectTab {
  static readonly type = '[browser] BrowserActionsSelectTab'

  constructor(public index: number) {
  }
}