const { SchemaDirectiveVisitor } = require('apollo-server');
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

		field.resolve = async () => {};
	}
}

module.exports = {
	UpperDirective,
};
