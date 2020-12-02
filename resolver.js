const { createJWTToken } = require('./auth');

const posts = [
	{
		title: 'Post 1',
		body: 'Body 1 for Post 1',
	},
	{
		title: 'Post 2',
		body: 'Body 2 for Post 2',
	},
];

const users = [
	{
		username: 'chomu',
		password: 'password',
	},
	{
		username: 'sid',
		password: 'password',
	},
];

module.exports = {
	Query: {
		hello: () => {
			return 'HEllo world';
		},

		posts: (_parent, _args, _context, _info) => {
			return posts;
		},
	},

	Mutation: {
		login: (_parent, args, _context, _info) => {
			const { username, password } = args;
			console.log('ctx', _context);
			const checkForUser = users.some(
				u =>
					u.username === username && u.password === password
			);

			if (!checkForUser) {
				throw new Error('wrong username/password');
			}

			const JWTToken = createJWTToken({ username });

			return {
				username,
				token: JWTToken,
			};
		},
	},
};
