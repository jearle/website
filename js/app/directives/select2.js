// require('../../lib/ivaynberg/select2');

module.exports = {
	name: 'jeSelectTwo',
	directive: [function () {
		return {
			restrict: 'A',
			link: function ($scope, element, attributes) {
				$(element).select2();
			}
		};
	}]
};