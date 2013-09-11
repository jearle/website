module.exports = {
	name: 'Root',
	controller: [
		'$scope',
    'DocumentsManifest',
		function ($scope, DocumentsManifest){
      
      $scope.titles = [];

      DocumentsManifest
        .titles()
        .success(function (titles) {
          $scope.titles = titles;
        });
        
		}
	]

};