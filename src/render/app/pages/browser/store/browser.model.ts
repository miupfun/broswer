import {BrowserTabEntity} from "../../../entitys/browser-tab.entity";
import {BrowserViewEntity} from "../../../entitys/browser-view.entity";

export class BrowserModel {
  currentTabIndex: number = -1
  tabs: BrowserTabEntity[] = []
  currentTabId: string = '';
  browserViews: BrowserViewEntity[] = []
}