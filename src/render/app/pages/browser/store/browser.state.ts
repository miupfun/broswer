import {Action, State, StateContext, StateToken} from "@ngxs/store";
import {BrowserModel} from "./browser.model";
import {
  BrowserActionsCloseTab,
  BrowserActionsCreateTab,
  BrowserActionsDropTab,
  BrowserActionsSelectTab, BrowserActionsSetTabTheme,
  BrowserActionsUpdateTab
} from "./browser.actions";
import {of} from "rxjs";
import {append, insertItem, patch, removeItem, updateItem} from "@ngxs/store/operators";
import {BrowserTabEntity} from "../../../entitys/browser-tab.entity";
import {Injectable} from "@angular/core";
import * as UUID from 'uuid'
import {moveItemInArray} from "@angular/cdk/drag-drop";
import {RepairType} from "@ngxs/store/operators/utils";
import {BrowserViewEntity} from "../../../entitys/browser-view.entity";
import {ColorUtil} from "../../../utils/color.util";

export const BROWSER_STATE = new StateToken<BrowserModel>('browser')

@State({
  name: BROWSER_STATE,
  defaults: new BrowserModel()
})
@Injectable({providedIn: "root"})
export class BrowserState {
  constructor() {
  }

  @Action(BrowserActionsSelectTab)
  selectTab(ctx: StateContext<BrowserModel>, payload: BrowserActionsSelectTab) {

    return of(ctx.setState(
      patch(
        {
          currentTabId: payload.tabId || null,
        }
      )
    )).pipe(
      (data) => {
        ctx.dispatch(new BrowserActionsSetTabTheme())
        return data
      }
    )
  }

  @Action(BrowserActionsCreateTab)
  createTab(ctx: StateContext<BrowserModel>, payload: BrowserActionsCreateTab) {
    let insertIndex = 0
    if (ctx.getState().currentTabId) {
      insertIndex = 1 + ctx.getState().tabs.findIndex(t => t.id === ctx.getState().currentTabId)
    }


    let lastTabIndex = -1
    for (const tab of ctx.getState().tabs) {
      lastTabIndex = (tab.createIndex > lastTabIndex) ? tab.createIndex : lastTabIndex;
    }

    const newTab: BrowserTabEntity = {
      id: UUID.v4(),
      createIndex: lastTabIndex + 1,
      createById: payload.createTabId || null,
      title: '',
      // url: payload.url || `${environment.rendererUrl}/#/setting`,
      url: payload.url || `https://www.baidu.com`,
      theme: '',
      icon: '',
      history: [],
      options: {}
    }
    const newBrowser: BrowserViewEntity = {
      id: newTab.id,
      url: newTab.url,
    }
    return of(ctx.setState(
      patch(
        {
          tabs: insertItem<BrowserTabEntity>(newTab, insertIndex),
          browserViews: append([newBrowser]),
          currentTabId: newTab.id || null,
        }
      )
    ))
  }

  @Action(BrowserActionsCloseTab)
  closeTab(ctx: StateContext<BrowserModel>, payload: BrowserActionsCloseTab) {
    const tabIndex = ctx.getState().tabs.findIndex(t => t.id === payload.tabId)
    const browserViewIndex = ctx.getState().browserViews.findIndex(v => v.id === payload.tabId)
    return ctx.setState(
      patch(
        {
          currentTabId: ctx.getState().currentTabId === payload.tabId ? null : ctx.getState().currentTabId,
          tabs: removeItem(tabIndex),
          browserViews: removeItem(browserViewIndex),
        }
      )
    )
  }

  @Action(BrowserActionsUpdateTab)
  updateTab(ctx: StateContext<BrowserModel>, payload: BrowserActionsUpdateTab) {
    const tabIndex = ctx.getState().tabs.findIndex(t => t.id === payload.id)
    return of(
      ctx.setState(
        patch({
          tabs: updateItem(tabIndex, patch(payload.tabInfo)),
        })
      )
    ).pipe(
      (data) => {
        // if (Object.keys(payload.tabInfo).includes('theme')) {
        //   ctx.dispatch(new BrowserActionsSetTabTheme())
        // }
        return data
      }
    );
  }

  @Action(BrowserActionsDropTab)
  dropTab(ctx: StateContext<BrowserModel>, payload: BrowserActionsDropTab) {
    return of(
      ctx.setState(
        patch({
          tabs: (existing: Readonly<RepairType<BrowserTabEntity>[]>): RepairType<BrowserTabEntity[]> => {
            const clone = existing.slice();
            moveItemInArray(clone, payload.previousIndex, payload.currentIndex)
            return clone;
          }
        })
      )
    );
  }


  @Action(BrowserActionsSetTabTheme)
  setTabTheme(ctx: StateContext<BrowserModel>, payload: BrowserActionsSetTabTheme) {
    const updateState: any = {}
    let color: string | null;
    if (payload.bgColor) {
      color = payload.bgColor
    } else {
      const currentTab = ctx.getState().tabs.find(t => t.id === ctx.getState().currentTabId)
      color = currentTab ? currentTab.theme : null
    }

    if (color) {
      updateState.navigationBarConfig = patch({
        backgroundColor: color,
        foregroundColor: ColorUtil.getContrastYIQ(color)
      })

    } else {
      updateState.navigationBarConfig = patch({
        backgroundColor: null,
        foregroundColor: null
      })
    }
    return of(ctx.setState(
      patch(updateState)
    ))
  }
}