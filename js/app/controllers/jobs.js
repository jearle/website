module.exports = {
	name: 'Jobs',
	controller: [
		'$scope',
		'Jobs',
		function ($scope, Jobs){
			$scope.jobs = [];

			Jobs
				.list()
				.then(function (jobs) {
					$scope.jobs = jobs;
				});
		}
	]

};