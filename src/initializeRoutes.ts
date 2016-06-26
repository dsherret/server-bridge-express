import * as express from "express";
import {Routes, Method, RouteDefinition} from "./dependencies";
import {pathJoin} from "./utils/pathJoin";

export function initializeRoutes(router: express.Router, routes: any[]) {
    routes.forEach((RouteConstructor) => {
        const routes: Routes = new RouteConstructor();

        routes.routeDefinitions.forEach(definition => {
            switch (definition.method) {
                case Method.Get:
                    initializeGet(router, routes, definition);
                    break;
                case Method.Post:
                    initializePost(router, routes, definition);
                    break;
                default:
                    throw `Not implemented definition method: ${definition.method}`;
            }
        });
    });
}

function initializeGet(router: express.Router, instance: Routes, definition: RouteDefinition) {
    router.get(pathJoin(instance.basePath, definition.name), (req, res, next) => {
        respond(res, next, definition.func.call(instance, req.params));
    });
}

function initializePost(router: express.Router, instance: Routes, definition: RouteDefinition) {
    router.post(pathJoin(instance.basePath, definition.name), (req, res, next) => {
        respond(res, next, definition.func.call(instance, req.body));
    });
}

function respond(res: express.Response, next: Function, returnVal: any) {
    if (Promise != null && typeof Promise.resolve === "function") {
        Promise.resolve(returnVal).then((result: any) => {
            sendRespondInfo(res, result);
        }).catch((err: any) => next(err));
    }
    else {
        try {
            sendRespondInfo(res, returnVal);
        } catch (err) {
            next(err);
        }
    }
}

function sendRespondInfo(res: express.Response, data: any) {
    res.status(200);
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(data));
}
