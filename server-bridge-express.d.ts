declare module "server-bridge-express" {
    // if this express import is causing an error, run...
    //
    //     tsd install express --save
    //
    // ...in the application root folder to include the express type definition
    import * as express from "express";

    export function initializeRoutes(router: express.Router, routes: typeof Routes[]): void;

    interface RouteDefinition {
        method: Method;
        name: string;
        func: Function;
    }

    class Routes {
        routeDefinitions: RouteDefinition[];
        basePath: string;
    }
    
    const enum Method {
        Get = 0,
        Post = 1
    }
}
