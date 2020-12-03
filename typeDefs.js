const gql = require('graphql-tag');

module.exports = gql`
	directive @upper on FIELD_DEFINITION
	directive @authenticated on FIELD_DEFINITION

	type AuthData {
		username: String!
		token: String!
	}

	type Post {
		title: String! @upper
		body: String
	}

	type Query {
		hello: String! @authenticated @upper
		posts: [Post!]! @authenticated
	}

	type Mutation {
		login(username: String!, password: String!): AuthData!
	}
`;
