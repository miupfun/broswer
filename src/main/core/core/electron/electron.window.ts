import {BrowserWindow, BrowserWindowConstructorOptions} from 'electron';

export class MpBrowserWindow extends BrowserWindow {

  private windowInstance: BrowserWindow | undefined;

  constructor(config?: WindowInitConfig) {
    super(config)
    if (config && config.url) {
      super.loadURL(config.url).then();
    }
  }

  get window(): BrowserWindow | undefined {
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
    if (this.isDestroy()) return;
    this.window?.show();
  }

  public close() {
    if (this.isDestroy()) return;
    this.window?.close();
  }

  public hide() {
    if (this.isDestroy()) return;
    this.window?.hide();
  }

  public focus() {
    if (this.isDestroy()) return;
    this.window?.focus();
  }

  public blur() {
    if (this.isDestroy()) return;
    this.window?.blur();
  }

  public isDestroy(): boolean {
    if (!this.window) {
      return false;
    }
    return this.window.isDestroyed();
  }

}


export interface WindowInitConfig extends BrowserWindowConstructorOptions {
  url: string
}
