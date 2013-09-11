module.exports = {
	type: 'factory',
	namespace: 'services',
	requires: [],
	components: [
		require('./__template'),
		require('./markdown'),
		require('./documents-manifest'),
		require('./jobs')
	]
}