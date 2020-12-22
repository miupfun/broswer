import { NgModule } from "@angular/core";
import { WindowControllerComponent } from "./window-controller.component";
import {FlexModule} from "@angular/flex-layout";
import {MpWindowDragModule} from "../window-drag";
import {MpWindowSelectModule} from "../window-select";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [WindowControllerComponent],
  imports: [
    FlexModule,
    MpWindowDragModule,
    MpWindowSelectModule,
    CommonModule
  ],
  exports: [WindowControllerComponent]
})
export class WindowControllerModule {

}