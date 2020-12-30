import {BrowserTabEntity} from "../../../entitys/browser-tab.entity";
import {BrowserViewEntity} from "../../../entitys/browser-view.entity";
import {NavigationBarConfigEntity} from "../../../entitys/navigation-bar-config.entity";

export class BrowserModel {
  currentTabId: string | null = null;
  tabs: BrowserTabEntity[] = [];
  browserViews: BrowserViewEntity[] = [];
  navigationBarConfig: NavigationBarConfigEntity = new NavigationBarConfigEntity()
}