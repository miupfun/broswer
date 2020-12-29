import {BrowserTabEntity} from "../../../entitys/browser-tab.entity";

export class BrowserActionsCreateTab {
  static readonly type = '[browser] BrowserActionsCreateTab';

  constructor(public url?: string) {
  }
}

export class BrowserActionsUpdateTab {
  static readonly type = '[browser] BrowserActionsUpdateTab'

  constructor(public index: number, public tabInfo: Partial<BrowserTabEntity>) {
  }
}

export class BrowserActionsSelectTab {
  static readonly type = '[browser] BrowserActionsSelectTab'

  constructor(public tabId: string) {
  }
}

export class BrowserActionsCloseTab {
  static readonly type = '[browser] BrowserActionsCloseTab'

  constructor(public tabId: string) {
  }
}

export class BrowserActionsDropTab {
  static readonly type = '[browser] BrowserActionsDropTab'

  constructor(public previousIndex: number, public currentIndex: number) {
  }
}

