var _ = require("lodash");
import { AdminRoutesDto } from "./src/modules/adminroutes/dto/adminroutes.dto";
const routes: AdminRoutesDto[] = [];

module.exports = function() {
  _.each(arguments, function(arg) {
    if (_.isObject(arg)) {
      if (arg.stack) {
        _.each(arg.stack, function(stack) {
          if (stack.route) {
            var route = stack.route,
              methodsDone = {};
            _.each(route.stack, function(r) {
              var method = r.method ? r.method.toUpperCase() : null;
              if (!methodsDone[method] && method) {
                var ruta = stack.route.path.split("/");
                var metodo = "";
                var controlador = "";
                var parametro = "";
                if (!ruta[2]) {
                  metodo = "";
                } else if (ruta[2].indexOf(":", 0) == 0) {
                  metodo = "";
                  parametro = ruta[2];
                } else {
                  metodo = ruta[2];
                }
                controlador = ruta[1];
                routes.push({
                  method: method,
                  controller: controlador,
                  path: stack.route.path
                });
              }
            });
          }
        });
      }
    }
  });
  return routes;
};
