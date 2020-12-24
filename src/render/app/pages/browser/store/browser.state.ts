import {Action, State, StateContext, StateToken} from "@ngxs/store";
import {BrowserModel} from "./browser.model";
import {BrowserActionsCreateTab, BrowserActionsSelectTab, BrowserActionsUpdateTab} from "./browser.actions";
import {of} from "rxjs";
import {insertItem, patch, updateItem} from "@ngxs/store/operators";
import {BrowserTabEntity} from "../../../entitys/browser-tab.entity";

export const BROWSER_STATE = new StateToken<BrowserModel>('browser')

@State({
  name: BROWSER_STATE,
  defaults: new BrowserModel()
})
export class BrowserState {
  constructor() {
  }

  @Action(BrowserActionsCreateTab)
  createTab(ctx: StateContext<BrowserModel>, payload: BrowserActionsCreateTab) {
    const old = ctx.getState()
    const newTab = {
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

  @Action(BrowserActionsUpdateTab)
  updateTab(ctx: StateContext<BrowserModel>, payload: BrowserActionsUpdateTab) {
    console.log(payload.tabInfo)
    return of(ctx.setState(patch({
      tabs: updateItem<BrowserTabEntity>(payload.index, patch(payload.tabInfo))
    })))
  }

  @Action(BrowserActionsSelectTab)
  selectTab(ctx: StateContext<BrowserModel>, payload: BrowserActionsSelectTab) {
    return of(
      ctx.patchState({
        currentTabIndex: payload.index
      })
    )
  }
}