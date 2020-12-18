import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserComponent } from './browser.component';
import { RouterModule } from "@angular/router";
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MpWindowDragModule } from '../../components/window-drag/index';
import { MpWindowSelectModule } from '../../components/window-select/index';


@NgModule({
  declarations: [BrowserComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    FlexLayoutModule,
    MpWindowDragModule,
    MpWindowSelectModule,
    RouterModule.forChild([
      {
        path: '',
        component: BrowserComponent
      }
    ])
  ]
})
export class BrowserModule {
}
