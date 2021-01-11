import {MpModule} from "./core";
import {MainController} from "./app/controller/main.controller";
import {BrowserWindowManager} from "./app/window/browser.window";

@MpModule({
  components: [],
  controllers: [MainController],
  views: [BrowserWindowManager]
})
export class MainAppModule {

}