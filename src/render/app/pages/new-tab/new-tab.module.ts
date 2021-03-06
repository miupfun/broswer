import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NewTabComponent} from './new-tab.component';
import {RouterModule} from "@angular/router";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {A11yModule} from "@angular/cdk/a11y";


@NgModule({
  declarations: [NewTabComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    A11yModule,
    RouterModule.forChild([{
      path: '',
      component: NewTabComponent
    }]),
  ]
})
export class NewTabModule {
}
