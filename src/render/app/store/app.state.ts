import {State, StateToken} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {AppModel} from "./app.model";

export const APP_STATE = new StateToken<AppModel>('app')

@State({
  name: APP_STATE,
  defaults: new AppState()
})
@Injectable({
  providedIn: "root"
})
export class AppState {
}