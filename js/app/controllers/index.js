module.exports = {
	type: 'controller',
	namespace: 'controllers',
	requires: [],
	components: [
		require('./root'),
		require('./jobs'),
		require('./about')
	]
}