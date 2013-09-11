module.exports = {
  name: 'Jobs',
  factory: [
  	'$q',
  	'Markdown',
		'DocumentsManifest',
  	function ($q, Markdown, DocumentsManifest) {

  		function renderSuccess (renderedJobs, count, deferred) {
  			return function (renderedJob) {
  				renderedJobs.push(renderedJob)
  				if (renderedJobs.length === count)
  					deferred.resolve(renderedJobs);
  			}
  		}

  		function documentsListSuccess (deferred) {
  			return function (files) {
  				var count = files.length;
  				var renderedJobs = [];
					angular.forEach(files, function (file) {
						Markdown
							.render(file)
							.success(renderSuccess(renderedJobs, count, deferred));
					});
				};

			}

  		return {
  			list: function () {
  				
  				var deferred = $q.defer();

  				DocumentsManifest
						.list()
						.success(documentsListSuccess(deferred));

					// window.ll = deferred.promise;
					return deferred.promise;
  				
  			}
  		};
  	}
  ]
};