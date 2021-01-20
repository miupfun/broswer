import {BrowserTabEntity} from "../../../../../share/entitys/browser-tab.entity";
import {BrowserViewEntity} from "../../../../../share/entitys/browser-view.entity";
import {NavigationBarConfigEntity} from "../../../../../share/entitys/navigation-bar-config.entity";
import {BrowserHistoryEntity} from "../../../../../share";

export class BrowserModel {
  currentTabId: string | null = null;
  editTabId: string | null = null;
  tabs: BrowserTabEntity[] = [];
  browserViews: BrowserViewEntity[] = [];
  navigationBarConfig: NavigationBarConfigEntity = new NavigationBarConfigEntity();
  history: BrowserHistoryEntity[] = []
}