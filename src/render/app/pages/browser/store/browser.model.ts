import {BrowserTabEntity} from "../../../../../share";
import {BrowserViewEntity} from "../../../../../share";
import {NavigationBarConfigEntity} from "../../../../../share";
import {BrowserHistoryEntity} from "../../../../../share";

export class BrowserModel {
  currentTabId: string | null = null;
  editTabId: string | null = null;
  tabs: BrowserTabEntity[] = [];
  browserViews: BrowserViewEntity[] = [];
  navigationBarConfig: NavigationBarConfigEntity = new NavigationBarConfigEntity();
  history: BrowserHistoryEntity[] = []
}