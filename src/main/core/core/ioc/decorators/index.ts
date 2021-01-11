import {injectable} from 'inversify';
import getDecorators from 'inversify-inject-decorators';
import {MpApplication} from '../miupApplication';

const {lazyInject} = getDecorators(MpApplication.container, false);

export function MpInjectable(injectKey?: any): ClassDecorator {
  return (target) => {
    const injectableFunction: ClassDecorator = injectable();
    injectableFunction(target);
  };
}

export function MpInject(injectKey: any): PropertyDecorator {
  return (target: Object, propertyKey: string | Symbol, index?: number) => {
    const injectFunction: Function = lazyInject(injectKey);
    injectFunction(target, propertyKey);
  };
}

export function MpModule(config: ModuleConfig): ClassDecorator {
  return (target) => {
  };
}

export class ModuleConfig {
  components?: Array<any>;
  services?: Array<any>;
  controllers?: Array<any>;
  views?: Array<any>;
  modules?: Array<any>;
}
