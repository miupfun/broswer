import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserComponent} from './browser.component';
import {RouterModule} from "@angular/router";
import {FlexLayoutModule} from '@angular/flex-layout';
import {MpWindowDragModule} from '../../components/window-drag';
import {MpWindowSelectModule} from '../../components/window-select';
import {BroswerWebviewComponent} from './components/broswer-webview/broswer-webview.component';
import {BrowserTabComponent} from './components/browser-tab/browser-tab.component';
import {BrowserContentComponent} from './components/browser-content/browser-content.component';
import {NgxsModule} from "@ngxs/store";
import {BrowserState} from "./store/browser.state";
import {FormsModule} from "@angular/forms";
import {BrowserTabItemComponent} from "./components/browser-tab-item/browser-tab-item.component";
import {BrowserContentItemComponent} from "./components/browser-content-item/browser-content-item.component";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {MpNavigationBarModule} from "../../components/navigation-bar/navigation-bar.module";


@NgModule({
  declarations: [BrowserComponent, BroswerWebviewComponent, BrowserTabComponent, BrowserContentComponent, BrowserTabItemComponent, BrowserContentItemComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    DragDropModule,
    MpWindowDragModule,
    MpWindowSelectModule,
    MpNavigationBarModule,
    NgxsModule.forFeature([BrowserState]),
    RouterModule.forChild([
      {
        path: '',
        component: BrowserComponent
      }
    ]),
    FormsModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class BrowserModule {
}
