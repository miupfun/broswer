import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavigationBarComponent} from "./navigation-bar.component";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MpWindowDragModule} from "../window-drag";
import {MpWindowSelectModule} from "../window-select";
import {WindowControllerComponent} from "./components/window-controller/window-controller.component";
import { MacControllerComponent } from './components/mac-controller/mac-controller.component';


@NgModule({
  declarations: [NavigationBarComponent, WindowControllerComponent, MacControllerComponent],
  imports: [
    CommonModule,
    MpWindowDragModule,
    MpWindowSelectModule,
    FlexLayoutModule,
  ],
  exports: [NavigationBarComponent]
})
export class MpNavigationBarModule {
}
