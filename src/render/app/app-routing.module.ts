import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'browser',
    loadChildren: () => import('./pages/browser/browser.module').then(m => m.BrowserModule)
  },
  {

    path: 'setting',
    loadChildren: () => import('./pages/setting/setting.module').then(m => m.SettingModule)
  },
  {
    path: 'new_tab',
    loadChildren: () => import('./pages/new-tab/new-tab.module').then(m => m.NewTabModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
