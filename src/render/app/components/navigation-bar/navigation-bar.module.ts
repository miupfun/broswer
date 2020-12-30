import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavigationBarComponent} from "./navigation-bar.component";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MpWindowDragModule} from "../window-drag";
import {MpWindowSelectModule} from "../window-select";
import {WindowControllerComponent} from "./components/window-controller/window-controller.component";


@NgModule({
  declarations: [NavigationBarComponent, WindowControllerComponent],
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
