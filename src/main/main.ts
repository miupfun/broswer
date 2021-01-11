import {MpApplication, MpApplicationFactory} from "./core";
import {MainAppModule} from "./app.module";

export async function bootstrap() {
  let app: MpApplication = MpApplicationFactory.create(MainAppModule);
  app.start()
}