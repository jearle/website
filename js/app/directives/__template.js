module.exports = {
	name: 'jeTemplate',
	directive: [function () {
		return {
			restrict: 'A',
			scope: {},
			templateUrl: '/partials/template.html',
			link: function ($scope, element, attributes) {

			}
		};
	}]
};