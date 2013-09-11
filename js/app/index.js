var routes = require('./routes');
var S = require('string');

var appParts = [
	require('./controllers'),
	require('./directives'),
	require('./filters'),
	require('./services')
];

var appPartNames = [];

var moduleNameSpace = 'je';

var partial = function (path) {
	return '/partials/' + path + '.html';
};

var createControllerName = function (route) {
	var camelizedRoute = S(route).camelize().s;
	var firstLetter = camelizedRoute.substr(0, 1);
	var capitalizedFirstLetter = firstLetter.toUpperCase();
	var controllerName = capitalizedFirstLetter + camelizedRoute.substr(1);
	return controllerName;
};

var prefixModule = function (namespace) {
	return moduleNameSpace + '.' + namespace;
};

var getAddEachPartComponent = function (part, module) {
	return function (component) {
		module[part.type](component.name, component[part.type]);
	};
}

var assembleApp = function (part) {
	var namespace = prefixModule(part.namespace);
	appPartNames.push(namespace);
	var module = angular.module(namespace, part.requires);
	angular.forEach(part.components, getAddEachPartComponent(part, module))
};

angular.forEach(appParts, assembleApp)

var app = angular.module(moduleNameSpace, appPartNames);

app
	.config(['$routeProvider', function ($routeProvider) {

		angular.forEach(routes, function (route) {
			$routeProvider
				.when('/' + route, {
					templateUrl: partial(route),
					controller: createControllerName(route)
				});
		});
		
	}]);