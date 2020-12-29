import {Action, State, StateContext, StateToken} from "@ngxs/store";
import {BrowserModel} from "./browser.model";
import {
  BrowserActionsCloseTab,
  BrowserActionsCreateTab,
  BrowserActionsDropTab,
  BrowserActionsSelectTab,
  BrowserActionsUpdateTab
} from "./browser.actions";
import {of} from "rxjs";
import {insertItem, patch, removeItem} from "@ngxs/store/operators";
import {BrowserTabEntity} from "../../../entitys/browser-tab.entity";
import {Injectable} from "@angular/core";
import * as UUID from 'uuid'
import {moveItemInArray} from "@angular/cdk/drag-drop";
import {RepairType} from "@ngxs/store/operators/utils";

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
    return of(
      ctx.patchState({
        currentTabId: payload.tabId
      })
    )
  }

  @Action(BrowserActionsCreateTab)
  createTab(ctx: StateContext<BrowserModel>, payload: BrowserActionsCreateTab) {
    let insertIndex = 0
    if (ctx.getState().currentTabId) {
      insertIndex = 1 + ctx.getState().tabs.findIndex(t => t.id === ctx.getState().currentTabId)
    }
    const newTab = {
      id: UUID.v4(),
      title: '',
      // url: payload.url || `${environment.rendererUrl}/#/setting`,
      url: payload.url || `https://www.baidu.com`,
      theme: '',
      icon: '',
      history: [],
      options: {}
    }
    return of(ctx.setState(
      patch(
        {
          tabs: insertItem<BrowserTabEntity>(newTab, insertIndex),
          currentTabId: newTab.id
        }
      )
    ))
  }

  @Action(BrowserActionsCloseTab)
  closeTab(ctx: StateContext<BrowserModel>, payload: BrowserActionsCloseTab) {
    const index = ctx.getState().tabs.findIndex(t => t.id === payload.tabId)
    if (index === -1) {
      return of(ctx.getState())
    }
    ctx.setState(
      patch(
        {
          tabs: removeItem(index)
        }
      )
    )
    const currentTab = ctx.getState().tabs[index]
    return of(
      ctx.patchState({
        currentTabId: currentTab ? currentTab.id : ''
      })
    )
  }

  @Action(BrowserActionsUpdateTab)
  updateTab(ctx: StateContext<BrowserModel>, payload: BrowserActionsUpdateTab) {
    return of(
      ctx.setState(
        patch({
          tabs: (existing: Readonly<RepairType<BrowserTabEntity>[]>): RepairType<BrowserTabEntity[]> => {
            const clone = existing.slice();
            const old = clone[payload.index]
            patch(payload.tabInfo)(old)
            return clone;
          }
        })
      )
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
}