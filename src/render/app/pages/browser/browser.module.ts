import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserComponent} from './browser.component';
import {RouterModule} from "@angular/router";
import {FlexLayoutModule} from '@angular/flex-layout';
import {MpWindowDragModule} from '../../components/window-drag';
import {MpWindowSelectModule} from '../../components/window-select';
import {NavigationBarComponent} from './components/navigation-bar/navigation-bar.component';
import {WindowControllerModule} from "../../components/window-controller/window-controller.module";
import {BroswerWebviewComponent} from './components/broswer-webview/broswer-webview.component';
import {BrowserTabComponent} from './components/browser-tab/browser-tab.component';
import {BrowserContentComponent} from './components/browser-content/browser-content.component';
import {NgxsModule} from "@ngxs/store";
import {BrowserState} from "./store/browser.state";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [BrowserComponent, NavigationBarComponent, BroswerWebviewComponent, BrowserTabComponent, BrowserContentComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MpWindowDragModule,
    MpWindowSelectModule,
    NgxsModule.forFeature([BrowserState]),
    RouterModule.forChild([
      {
        path: '',
        component: BrowserComponent
      }
    ]),
    WindowControllerModule,
    FormsModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class BrowserModule {
}
