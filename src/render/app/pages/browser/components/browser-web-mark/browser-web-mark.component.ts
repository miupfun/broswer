import {NestedTreeControl} from '@angular/cdk/tree';
import {Component, ViewEncapsulation} from '@angular/core';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {Select, Store} from "@ngxs/store";
import {BrowserState} from "../../store/browser.state";
import {Observable} from "rxjs";
import {BrowserHistoryEntity} from "../../../../../../share";
import {BrowserActionsCreateTab} from "../../store/browser.actions";

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Fruit',
    children: [
      {name: 'Apple'},
      {name: 'Banana'},
      {name: 'Fruit loops'},
    ]
  }, {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [
          {name: 'Broccoli'},
          {name: 'Brussels sprouts'},
        ]
      }, {
        name: 'Orange',
        children: [
          {name: 'Pumpkins'},
          {name: 'Carrots'},
        ]
      },
    ]
  },
];

/**
 * @title Tree with nested nodes
 */
@Component({
  selector: 'mp-browser-web-mark',
  templateUrl: './browser-web-mark.component.html',
  styleUrls: ['./browser-web-mark.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class BrowserWebMarkComponent {
  treeControl = new NestedTreeControl<FoodNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<FoodNode>();

  constructor(private store: Store) {
    this.dataSource.data = TREE_DATA;
  }

  @Select(BrowserState.history)
  $viewHistory: Observable<BrowserHistoryEntity[]> | undefined

  hasChild = (_: number, node: FoodNode) => !!node.children && node.children.length > 0;


  openNewTab(history: BrowserHistoryEntity) {
    let currentTab = this.store.selectSnapshot(BrowserState.currentTab);
    this.store.dispatch(new BrowserActionsCreateTab({url: history.url}, currentTab?.id)).subscribe(() => {
    })
  }
}