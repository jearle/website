module.exports = {
	name: 'jeActiveLink',
	directive: [
		'$location', 
		function ($location) {
			return {
				restrict: 'A',
				scope: {
					activeClass: '@'
				},
				link: function ($scope, element, attributes) {
					var clazz = attributes.activeClass;
	        var path = attributes.href;
	        path = path.substring(1); //hack because path does bot return including hashbang
	        $scope.location = $location;
	        $scope.$watch('location.path()', function() {
	        	if (path === $location.path())
	        		element.addClass(clazz);
	        	else
	        		element.removeClass(clazz);
	        });
				}
			};
		}
	]
};