import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Store} from "@ngxs/store";
import {BrowserTabEntity} from "../../../../../../share";
import {BrowserState} from "../../store/browser.state";
import {BrowserActionsFinishEditUrl} from "../../store/browser.actions";
import {UrlDecodePipe} from "../../../../pipes/url-encode/url-decode.pipe";

@Component({
  selector: 'mp-tab-url-edit',
  templateUrl: './tab-url-edit.component.html',
  styleUrls: ['./tab-url-edit.component.scss']
})
export class TabUrlEditComponent implements OnInit, AfterViewInit {

  control: FormControl | any;
  @ViewChild("inputElement", {static: true})
  inputElement: ElementRef | undefined;

  editTab: BrowserTabEntity | undefined;

  constructor(private store: Store) {
    this.editTab = this.store.selectSnapshot(BrowserState.editTab)
    this.control = new FormControl(new UrlDecodePipe().transform(this.editTab?.url||''));
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
