import {BrowserWindow, BrowserWindowConstructorOptions} from 'electron';

export class MpWindowManager implements MpWindowManagerInterface {

  private windowInstance: BrowserWindow | undefined;

  async init(config?: WindowInitConfig): Promise<BrowserWindow> {
    this.windowInstance = new BrowserWindow(config);
    if (config && config.url) {
      await this.windowInstance.loadURL(config.url);
    }
    return this.windowInstance
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
    if (this.isDestroy()) {
      return
    }
    this.windowInstance?.show();
  }

  public close() {
    if (this.isDestroy()) {
      return
    }
    this.windowInstance?.close();
  }

  public hide() {
    if (this.isDestroy()) {
      return
    }
    this.windowInstance?.hide();
  }

  public focus() {
    if (this.isDestroy()) {
      return
    }
    this.windowInstance?.focus();
  }

  public blur() {
    if (this.isDestroy()) {
      return
    }
    this.windowInstance?.blur();
  }

  public isDestroy(): boolean {
    if (!this.windowInstance) {
      return true;
    }
    return this.windowInstance?.isDestroyed();
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
