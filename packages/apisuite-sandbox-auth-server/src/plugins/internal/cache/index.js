
exports = module.exports = {}

exports.plugin = {
	register:(server)=> {

		const cache = server.cache({ segment : 'sessions', expiresIn: 3 * 24 * 60 * 60 * 1000})
		server.app.cache = cache
	},
	name: 'cache',
}
