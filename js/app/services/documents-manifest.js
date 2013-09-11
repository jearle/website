var S = require('string');
var _ = require('lodash');

module.exports = {
  name: 'DocumentsManifest',
  factory: [
  	'$http',
  	function ($http) {
  		
  		var manifest = "/documents/manifest.json";

      function toTitleCase(str) {
        return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
      }

  		var DocumentsManifest = {
  			list: function () {
  				var p = $http.get(manifest);
		  		var oldSuccess = p.success;
		  		var newSuccess = function (cb) {

						var newCb = function (data, status, headers, config) {
							var dirs = Object.keys(data);
							var paths = [];
							angular.forEach(dirs, function (dir) {
								angular.forEach(data[dir], function (file) {
									paths.push('/documents/' + dir + '/' + file + '.md');
								});
							});
							cb(paths, status, headers, config);
						}
						
						oldSuccess(newCb);

					};

					p.success = newSuccess;

					return p;
  			},
        titles: function () {
          var p = $http.get(manifest);
          var oldSuccess = p.success;
          var newSuccess = function (cb) {
            
            var newCb = function (data, status, headers, config) {
              var titles = _.map(Object.keys(data), function (title) {
                return toTitleCase(S(title)
                  .humanize()
                  .capitalize()
                  .s);
              });

              cb(titles, status, headers, config);
            }

            oldSuccess(newCb);

          };

          p.success = newSuccess;

          return p;
        }
  		};

      return DocumentsManifest;
  	}
  ]
};