import {BrowserTabEntity} from "../../../entitys/browser-tab.entity";

export class BrowserActionsCreateTab {
  static readonly type = '[browser] BrowserActionsCreateTab';

  constructor(public createTabId?: string, public url?: string) {
  }
}

export class BrowserActionsUpdateTab {
  static readonly type = '[browser] BrowserActionsUpdateTab'

  constructor(public id: string, public tabInfo: Partial<BrowserTabEntity>) {
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

export class BrowserActionsSetTabTheme {
  static readonly type = '[browser] BrowserActionsSetTabTheme'

  constructor(public bgColor?: string) {
  }
}


export class BrowserActionsHistoryGo {
  static readonly type = '[browser] BrowserActionsHistoryGo'

  constructor(public bf: 0 | -1 | 1) {
  }
}

export class BrowserActionsEditUrl {
  static readonly type = '[browser] BrowserActionsEditUrl'

  constructor(public tabId: string) {
  }
}

export class BrowserActionsFinishEditUrl {
  static readonly type = '[browser] BrowserActionsFinishEditUrl'
  constructor(public url: string) {
  }
}

