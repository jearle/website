var md = require('markdown').markdown;

module.exports = {
  name: 'Markdown',
  factory: [
  	'$http',
  	function ($http) {

  		return {
  			render: function (path) {
  				
  				var p = $http({
  					method: 'GET',
  					url: path
  				});

  				var oldSuccess = p.success;

  				var newSuccess = function (cb) {

  					var newCb = function (data, status, headers, config) {
  						var transformedData = md.toHTML(data);
  						cb(transformedData, status, headers, config);
  					}
  					
  					oldSuccess(newCb);

  				};

  				p.success = newSuccess;

  				return p;

  			}
  		};
  	}
  ]
};