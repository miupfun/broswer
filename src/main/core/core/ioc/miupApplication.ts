import {Container, interfaces} from 'inversify';
import 'reflect-metadata';

export class MpApplication {
    public static container = new Container({
        skipBaseClassChecks: true,
        defaultScope: 'Singleton',
        autoBindInjectable: true
    });

    constructor() {
    }

    get<T>(serviceIdentifier: interfaces.ServiceIdentifier<T>): T {
        return MpApplication.container.get(serviceIdentifier);
    }

    start() {
    }
}

export class MpApplicationFactory {
    static create(module: any): MpApplication {
        return new MpApplication();
    }
}

export class BaseModule {
    components?: Array<any>;
    services?: Array<any>;
    routes?: Array<any>;
    views?: Array<any>;
}
