import {BrowserTabEntity} from "../../../entitys/browser-tab.entity";

export class BrowserModel {
  currentTabIndex: number = -1
  tabs: BrowserTabEntity[] = []
}