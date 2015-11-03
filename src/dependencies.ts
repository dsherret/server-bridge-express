// dependencies from server-routes

export interface Routes {
    routeDefinitions: RouteDefinition[];
    basePath: string;
}

export interface RouteDefinition {
    method: Method;
    name: string;
    func: Function;
}

export const enum Method {
    Get = 0,
    Post = 1
}
