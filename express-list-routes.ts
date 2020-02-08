var _ = require("lodash");
import { RouteDto } from "./src/modules/route/dto/route.dto";
const routes: RouteDto[] = [];

module.exports = function() {
  _.each(arguments, function(arg) {
    if (_.isObject(arg)) {
      if (arg.stack) {
        _.each(arg.stack, function(stack) {
          if (stack.route) {
            if (!routes.find(e => e.path === stack.route.path)) {
              routes.push({
                path: stack.route.path
              });
            }
          }
        });
      }
    }
  });
  return routes;
};
