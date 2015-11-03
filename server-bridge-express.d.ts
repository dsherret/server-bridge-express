declare module "server-bridge-express" {
    // if this express import is causing an error, run...
    //
    //     tsd install express --save
    //
    // ...in the application root folder to include the express type definition
    import * as express from "express";
    // if this server-bridge import is causing an error, run...
    //
    //     npm install server-bridge --save
    //     tsd link
    //
    // ...in the application's root folder to install server-bridge 
    // and link to the typescript definition files in the node package. 
    import {Routes} from "server-bridge";

    export function initializeRoutes(router: express.Router, routes: typeof Routes[]): void;
}
