import {Action, createSelector, NgxsOnInit, Selector, State, StateContext, StateToken, Store} from "@ngxs/store";
import {BrowserModel} from "./browser.model";
import {
  BrowserActionsAddWebHistory,
  BrowserActionsCloseTab,
  BrowserActionsCreateTab,
  BrowserActionsDropTab,
  BrowserActionsEditUrl,
  BrowserActionsFinishEditUrl,
  BrowserActionsHistoryGo,
  BrowserActionsInitState,
  BrowserActionsNavigationTo,
  BrowserActionsSelectTab,
  BrowserActionsSetTabTheme,
  BrowserActionsToggleDevTool,
  BrowserActionsToggleHtmlFullscreen,
  BrowserActionsUpdateTab
} from "./browser.actions";
import {of} from "rxjs";
import {append, insertItem, patch, removeItem, updateItem} from "@ngxs/store/operators";
import {BrowserTabEntity, BrowserViewEntity, RouteUtil} from "../../../../../share";
import {Injectable} from "@angular/core";
import * as UUID from 'uuid'
import {moveItemInArray} from "@angular/cdk/drag-drop";
import {RepairType} from "@ngxs/store/operators/utils";
import {ColorUtil} from "../../../utils/color.util";
import {BrowserWebviewController} from "../../../components/broswer-webview";
import {StoreService} from "../../../services/store.service";
import * as path from "path";

export const BROWSER_STATE = new StateToken<BrowserModel>('browser')

@State({
  name: BROWSER_STATE,
  defaults: new BrowserModel()
})
@Injectable({providedIn: "root"})
export class BrowserState implements NgxsOnInit {
  constructor(private store: Store,
              private storeService: StoreService,
              private browserWebviewController: BrowserWebviewController) {

  }


  ngxsOnInit(ctx?: StateContext<any>): any {
    this.store.dispatch(new BrowserActionsInitState()).subscribe((v) => {
      this.store.select(BrowserState).subscribe((v) => {
        this.storeService.store(BROWSER_STATE.getName(), JSON.stringify(v))
      })
    })
  }

  @Action(BrowserActionsInitState)
  initState(ctx: StateContext<BrowserModel>) {
    console.log('initState')
    const oldData: string | null = this.storeService.get(BROWSER_STATE.getName())
    if (oldData) {
      return of(ctx.setState(JSON.parse(oldData)))
    } else {
      return this.store.dispatch(new BrowserActionsCreateTab({
        url: RouteUtil.getPageUrl('new_tab'),
        defaultIcon: 'icon-tab'
      }))
    }
  }

  @Action(BrowserActionsToggleHtmlFullscreen)
  toggleFullscreen(ctx: StateContext<BrowserModel>, payload: BrowserActionsToggleHtmlFullscreen) {
    return of(
      ctx.setState(
        patch({
          htmlFullscreen: payload.fullscreen
        })
      )
    )
  }

  @Action(BrowserActionsSelectTab)
  selectTab(ctx: StateContext<BrowserModel>, payload: BrowserActionsSelectTab) {
    const tb = ctx.getState().tabs.find(t => t.id === payload.tabId)
    return of(ctx.setState(
      patch(
        {
          currentTabId: tb ? tb.id : null,
        }
      )
    )).pipe(
      (data) => {
        ctx.dispatch(new BrowserActionsSetTabTheme(tb ? tb.theme : undefined))
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
      url: payload.tabInfo.url || '',
      theme: '',
      defaultIcon: payload.tabInfo.defaultIcon || '',
      icon: '',
      history: [],
      options: {
        tabUrlReadOnly: RouteUtil.isLocalUrl(payload.tabInfo.url || ''),
      },
      canGoBack: false,
      canGoForward: false,
      loading: false
    }
    const newBrowser: BrowserViewEntity = {
      id: newTab.id,
      url: newTab.url,
      options: {
        nodeApiEnable: RouteUtil.isLocalUrl(payload.tabInfo.url || ''),
      }
    }
    return of(ctx.setState(
      patch(
        {
          tabs: insertItem<BrowserTabEntity>(newTab, insertIndex),
          browserViews: append([newBrowser]),
        }
      )
    )).pipe(
      (data) => {
        ctx.dispatch(new BrowserActionsSelectTab(newTab.id))
        return data
      }
    )
  }

  @Action(BrowserActionsCloseTab)
  closeTab(ctx: StateContext<BrowserModel>, payload: BrowserActionsCloseTab) {
    const tabIndex = ctx.getState().tabs.findIndex(t => t.id === payload.tabId)
    const browserViewIndex = ctx.getState().browserViews.findIndex(v => v.id === payload.tabId)
    const patchState: any = {
      browserViews: removeItem(browserViewIndex),
      tabs: removeItem(tabIndex)
    }
    return of(ctx.setState(patch(patchState))).pipe(data => {
      if (payload.tabId === ctx.getState().currentTabId) {
        let nextSelectIndex: number = tabIndex - 1 < 0 ? 1 : tabIndex - 1;
        const nextTab = ctx.getState().tabs[nextSelectIndex]

        ctx.dispatch(new BrowserActionsSelectTab(nextTab?.id))
      }
      return data
    }).pipe((data) => {
      if (ctx.getState().tabs.length <= 0) {
        window.close()
      }
      return data
    })
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
        if (payload.id !== ctx.getState().currentTabId) {
          return data
        }
        ctx.dispatch(new BrowserActionsSetTabTheme(payload.tabInfo.theme))
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

  @Action(BrowserActionsHistoryGo)
  browserHistoryGo(ctx: StateContext<BrowserModel>, payload: BrowserActionsHistoryGo) {
    return of(
      this.browserWebviewController.historyGo(ctx.getState().currentTabId, payload.bf)
    )
  }

  @Action(BrowserActionsEditUrl)
  editTabUrl(ctx: StateContext<BrowserModel>, payload: BrowserActionsEditUrl) {
    return of(ctx.patchState({
      editTabId: payload.tabId
    }))
  }

  @Action(BrowserActionsFinishEditUrl)
  finishEditTabUrl(ctx: StateContext<BrowserModel>, payload: BrowserActionsFinishEditUrl) {
    if (payload.url) {
      this.browserWebviewController.navigationTo(ctx.getState().editTabId, payload.url)
    }
    return of(ctx.patchState({
      editTabId: null
    }))
  }

  @Action(BrowserActionsNavigationTo)
  navigationTo(ctx: StateContext<BrowserModel>, payload: BrowserActionsNavigationTo) {
    return of(
      this.browserWebviewController.navigationTo(payload.tabId, payload.toUrl)
    )
  }

  @Action(BrowserActionsToggleDevTool)
  toggleDevTool(ctx: StateContext<BrowserModel>) {
    this.browserWebviewController.toggleDevTool(ctx.getState().currentTabId)
    return of(ctx.getState())
  }

  @Action(BrowserActionsAddWebHistory)
  addHistory(ctx: StateContext<BrowserModel>, payload: BrowserActionsAddWebHistory) {
    if (RouteUtil.isLocalUrl(payload.history.url)) {
      return of(ctx.getState())
    }
    return of(ctx.setState(
      patch(
        {
          history: insertItem(payload.history, 0),
        }
      )
    ))
  }

  @Selector()
  static currentTab(state: BrowserModel) {
    return state.tabs.find(t => t.id === state.currentTabId)
  }

  @Selector()
  static editTab(state: BrowserModel) {
    return state.tabs.find(t => t.id === state.editTabId)
  }

  @Selector()
  static history(state: BrowserModel) {
    return state.history
  }

  static selectTab(id: string) {
    return createSelector([BrowserState], (state: BrowserModel) => {
      return state.tabs.find(t => t.id === id)
    })
  }

  static selectWebview(id: string) {
    return createSelector([BrowserState], (state: BrowserModel) => {
      return state.browserViews.find(t => t.id === id)
    })
  }


}