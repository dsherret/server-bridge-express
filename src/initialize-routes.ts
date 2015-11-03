import * as express from "express";
import {Routes} from "./routes";
import {Method} from "./method";
import {RouteDefinition} from "./route-definition";
import {resolve as urlResolve} from "url";

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
    router.get(urlResolve(instance.basePath, definition.name), (req, res, next) => {
        return definition.func.call(instance, req.params).then((result: any) => {
            res.status(200);
            res.setHeader("Content-Type", "application/json");
            res.send(JSON.stringify(result));
        }).catch((err: any) => next(err));
    });
}

function initializePost(router: express.Router, instance: Routes, definition: RouteDefinition) {
    router.post(urlResolve(instance.basePath, definition.name), (req, res, next) => {
        const sentObject = req.body;

        return definition.func.call(instance, sentObject).then((result: any) => {
            res.status(200);
            res.setHeader("Content-Type", "application/json");
            res.send(JSON.stringify(result));
        }).catch((err: any) => next(err));
    });
}