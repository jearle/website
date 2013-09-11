module.exports = {
	type: 'directive',
	namespace: 'directives',
	requires: [],
	components: [
		require('./__template'),
		require('./active-link'),
		require('./select2')
	]
}