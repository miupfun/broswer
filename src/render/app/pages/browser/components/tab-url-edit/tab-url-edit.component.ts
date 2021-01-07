import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {Select, Store} from "@ngxs/store";
import {BrowserTabEntity} from "../../../../../../share/entitys/browser-tab.entity";
import {BrowserState} from "../../store/browser.state";
import {BrowserActionsEditUrl, BrowserActionsFinishEditUrl} from "../../store/browser.actions";

@Component({
  selector: 'mp-tab-url-edit',
  templateUrl: './tab-url-edit.component.html',
  styleUrls: ['./tab-url-edit.component.scss']
})
export class TabUrlEditComponent implements OnInit, AfterViewInit {

  control: FormControl | any;
  @ViewChild("inputElement", {static: true})
  inputElement: ElementRef | undefined;

  constructor(private store: Store) {
    const editTab = this.store.selectSnapshot(BrowserState.editTab)
    this.control = new FormControl(editTab?.url);
  }

  ngOnInit() {
  }

  onFocus(e: Event | any) {
  }

  closeEdit() {
    this.store.dispatch(new BrowserActionsFinishEditUrl(''))
  }

  submitEdit() {
    this.store.dispatch(new BrowserActionsFinishEditUrl(this.control?.value))
  }

  ngAfterViewInit(): void {
    this.inputElement?.nativeElement.focus()
    this.inputElement?.nativeElement.select()
  }
}
