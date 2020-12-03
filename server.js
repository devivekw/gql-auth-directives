const {
	ApolloServer,
	makeExecutableSchema,
} = require('apollo-server');
const { getUserFromJWTToken } = require('./auth');

// Schema Data
const typeDefs = require('./typeDefs');
const resolvers = require('./resolver');
const {
	UpperDirective,
	AuthenticatedDirective,
} = require('./directive');

const PORT = 3088;

const schema = makeExecutableSchema({
	typeDefs,
	resolvers,
	schemaDirectives: {
		upper: UpperDirective,
		authenticated: AuthenticatedDirective,
	},
});

const server = new ApolloServer({
	schema,
	context({ req }) {
		const token = req.headers.authorization;

		let user;
		if (token) {
			user = getUserFromJWTToken(token);
		}

		return { user };
	},
});

server.listen(PORT).then(({ url }) => {
	console.log(`🚀 Server ready at ${url}`);
});
