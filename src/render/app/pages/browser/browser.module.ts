import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserComponent} from './browser.component';
import {RouterModule} from "@angular/router";


@NgModule({
    declarations: [BrowserComponent],
    imports: [
        CommonModule,
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
