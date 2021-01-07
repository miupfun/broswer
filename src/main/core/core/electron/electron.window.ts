import {BrowserWindow, BrowserWindowConstructorOptions} from 'electron';
import {WindowException} from './exceptions';

export class MpWindowManager implements MpWindowManagerInterface {

  private windowInstance: BrowserWindow|undefined;

  async init(config?: WindowInitConfig): Promise<BrowserWindow> {
    this.windowInstance = new BrowserWindow(config);
    if (config && config.url) {
      await this.windowInstance.loadURL(config.url);
    }
    return this.windowInstance
  }

  get window(): BrowserWindow |undefined{
    return this.windowInstance;
  }

  public destroy() {
    if (this.isDestroy()) {
      return;
    }
    this.window?.close();
    this.window?.destroy();
    this.windowInstance = undefined;
  }

  public show() {
    this.isDestroy();
    this.instance.show();
  }

  public close() {
    this.isDestroy();
    this.instance.close();
  }

  public hide() {
    this.isDestroy();
    this.instance.hide();
  }

  public focus() {

    this.instance.focus();
  }

  public blur() {
    this.isDestroy();
    this.instance.blur();
  }

  public isDestroy(): boolean {
    if (!this.instance) {
      return false;
    }
    return this._instance.isDestroyed();
  }
  
}

export interface MpWindowManagerInterface {

  init(config?: WindowInitConfig): void

  destroy(): void

  isDestroy(): boolean
}

export interface WindowInitConfig extends BrowserWindowConstructorOptions {
  url: string
}
