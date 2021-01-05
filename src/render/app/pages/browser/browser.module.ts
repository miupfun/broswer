import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserComponent} from './browser.component';
import {RouterModule} from "@angular/router";
import {FlexLayoutModule} from '@angular/flex-layout';
import {MpWindowDragModule} from '../../components/window-drag';
import {MpWindowSelectModule} from '../../components/window-select';
import {BrowserTabComponent} from './components/browser-tab/browser-tab.component';
import {BrowserContentComponent} from './components/browser-content/browser-content.component';
import {NgxsModule} from "@ngxs/store";
import {BrowserState} from "./store/browser.state";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserTabItemComponent} from "./components/browser-tab-item/browser-tab-item.component";
import {BrowserContentItemComponent} from "./components/browser-content-item/browser-content-item.component";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {MpNavigationBarModule} from "../../components/navigation-bar/navigation-bar.module";
import {MatButtonModule} from "@angular/material/button";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatIconModule} from "@angular/material/icon";
import {MatRippleModule} from "@angular/material/core";
import {MpBrowserWebviewModule} from "../../components/broswer-webview";
import {TabUrlEditComponent} from './components/tab-url-edit/tab-url-edit.component';
import {MatSidenavModule} from "@angular/material/sidenav";

@NgModule({
  declarations: [BrowserComponent, BrowserTabComponent, BrowserContentComponent, BrowserTabItemComponent, BrowserContentItemComponent, TabUrlEditComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    DragDropModule,
    MpWindowDragModule,
    MpWindowSelectModule,
    MpNavigationBarModule,
    MpBrowserWebviewModule,
    MatAutocompleteModule,
    MatSidenavModule,
    NgxsModule.forFeature([BrowserState]),
    RouterModule.forChild([
      {
        path: '',
        component: BrowserComponent
      }
    ]),
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatRippleModule,
    ReactiveFormsModule,
  ],
})
export class BrowserModule {
}
