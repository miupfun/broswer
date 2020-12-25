import {Action, State, StateContext, StateToken} from "@ngxs/store";
import {BrowserModel} from "./browser.model";
import {
  BrowserActionsCloseTab,
  BrowserActionsCreateTab,
  BrowserActionsSelectTab,
  BrowserActionsUpdateTab
} from "./browser.actions";
import {of} from "rxjs";
import {insertItem, patch, removeItem, updateItem} from "@ngxs/store/operators";
import {BrowserTabEntity} from "../../../entitys/browser-tab.entity";
import {Injectable} from "@angular/core";
import * as UUID from 'uuid'

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
        currentTabIndex: payload.index
      })
    )
  }

  @Action(BrowserActionsCreateTab)
  createTab(ctx: StateContext<BrowserModel>, payload: BrowserActionsCreateTab) {
    const old = ctx.getState()
    const newTab = {
      id: UUID.v4(),
      title: '',
      url: payload.url || 'https://www.baidu.com',
      theme: '',
      icon: '',
      history: [],
      options: {}
    }
    return of(ctx.setState(
      patch(
        {
          tabs: insertItem<BrowserTabEntity>(newTab, old.currentTabIndex + 1),
        }
      )
    ))
  }

  @Action(BrowserActionsCloseTab)
  closeTab(ctx: StateContext<BrowserModel>, payload: BrowserActionsCloseTab) {
    const tabsLength = ctx.getState().tabs.length
    const currentTabIndex = ctx.getState().currentTabIndex
    let nextTab = -1;

    if (tabsLength > 1) {
      nextTab = payload.index > 0 ? payload.index - 1 : 0
    } else {
      nextTab = -1
    }

    return of(
      ctx.setState(
        patch(
          {
            currentTabIndex: nextTab,
            tabs: removeItem(payload.index)
          }
        )
      )
    )
  }

  @Action(BrowserActionsUpdateTab)
  updateTab(ctx: StateContext<BrowserModel>, payload: BrowserActionsUpdateTab) {
    return of(
      ctx.setState(
        patch({
          tabs: updateItem(payload.index, patch(payload.tabInfo))
        })
      )
    );
  }
}