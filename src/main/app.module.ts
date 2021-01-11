import {MpModule} from "./core";
import {MainController} from "./app/controller/main.controller";
import {BrowserWindow} from "./app/window/browser.window";

@MpModule({
  components: [],
  controllers: [MainController],
  views: [BrowserWindow]
})
export class MainAppModule {

}