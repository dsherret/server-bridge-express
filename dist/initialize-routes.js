var url_1 = require("url");
function initializeRoutes(router, routes) {
    routes.forEach(function (RouteConstructor) {
        var routes = new RouteConstructor();
        routes.routeDefinitions.forEach(function (definition) {
            switch (definition.method) {
                case 0:
                    initializeGet(router, routes, definition);
                    break;
                case 1:
                    initializePost(router, routes, definition);
                    break;
                default:
                    throw "Not implemented definition method: " + definition.method;
            }
        });
    });
}
exports.initializeRoutes = initializeRoutes;
function initializeGet(router, instance, definition) {
    router.get(url_1.resolve(instance.basePath, definition.name), function (req, res, next) {
        return definition.func.call(instance, req.params).then(function (result) {
            res.status(200);
            res.setHeader("Content-Type", "application/json");
            res.send(JSON.stringify(result));
        }).catch(function (err) { return next(err); });
    });
}
function initializePost(router, instance, definition) {
    router.post(url_1.resolve(instance.basePath, definition.name), function (req, res, next) {
        var sentObject = req.body;
        return definition.func.call(instance, sentObject).then(function (result) {
            res.status(200);
            res.setHeader("Content-Type", "application/json");
            res.send(JSON.stringify(result));
        }).catch(function (err) { return next(err); });
    });
}
