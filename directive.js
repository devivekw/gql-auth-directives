const {
	SchemaDirectiveVisitor,
	AuthenticationError,
} = require('apollo-server');
const { defaultFieldResolver } = require('graphql');

class UpperDirective extends SchemaDirectiveVisitor {
	visitFieldDefinition(field) {
		const { resolve = defaultFieldResolver } = field;

		field.resolve = async (root, otherArgs, ctx, info) => {
			const result = await resolve.call(
				this,
				root,
				otherArgs,
				ctx,
				info
			);

			if (typeof result === 'string') {
				return result.toUpperCase();
			}
			console.log(result);
			return result;
		};
	}
}

class AuthenticatedDirective extends SchemaDirectiveVisitor {
	visitFieldDefinition(field) {
		const { resolve = defaultFieldResolver } = field;

		field.resolve = async (root, otherArgs, ctx, info) => {
			if (!ctx.user) {
				throw new AuthenticationError(
					'User not authenticated'
				);
			}

			const result = await resolve.call(
				this,
				root,
				otherArgs,
				ctx,
				info
			);
			return result;
		};
	}
}

module.exports = {
	UpperDirective,
	AuthenticatedDirective,
};
