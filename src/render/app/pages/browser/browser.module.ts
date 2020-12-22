import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserComponent} from './browser.component';
import {RouterModule} from "@angular/router";
import {FlexLayoutModule} from '@angular/flex-layout';
import {MpWindowDragModule} from '../../components/window-drag';
import {MpWindowSelectModule} from '../../components/window-select';
import {NavigationBarComponent} from './components/navigation-bar/navigation-bar.component';
import {WindowControllerModule} from "../../components/window-controller/window-controller.module";
import { BroswerWebviewComponent } from './components/broswer-webview/broswer-webview.component';


@NgModule({
  declarations: [BrowserComponent, NavigationBarComponent, BroswerWebviewComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MpWindowDragModule,
    MpWindowSelectModule,
    RouterModule.forChild([
      {
        path: '',
        component: BrowserComponent
      }
    ]),
    WindowControllerModule
  ]
})
export class BrowserModule {
}
