import {app} from 'electron';
if (!app.requestSingleInstanceLock()) {
  app.quit()
} else {
  import('./main').then(m => {
    m.bootstrap().then()
  })
}