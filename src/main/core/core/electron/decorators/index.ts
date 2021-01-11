import {app, Event, ipcMain} from 'electron'
import {MpApplication} from "../../ioc";


export function MpAppOn(event: string, op?: { once: boolean }) {
  return (target: any, methodName: string, desc: PropertyDescriptor) => {
    if (op && op.once) {
      app.once(event as any, () => {
        const who = MpApplication.container.get(target.constructor)
        desc.value.apply(who)
      })
    } else {
      app.on(event as any, () => {
        const who = MpApplication.container.get(target.constructor)
        desc.value.apply(who)
      })
    }
  }
}

export function MpIpcMainOn(event: string, op?: { once: boolean }) {
  return (target: any, methodName: string, desc: PropertyDescriptor) => {
    if (op && op.once) {
      ipcMain.once(event as any, (e: Event, ...params) => {
        const who = MpApplication.container.get(target.constructor)
        desc.value.apply(who, e, ...params)
      })
    } else {
      ipcMain.on(event as any, (e: Event, ...params) => {
        const who = MpApplication.container.get(target.constructor)
        desc.value.call(who, e, ...params)
      })
    }
  }
}

