const jwt = require('jsonwebtoken');

const JWT_SECRET = 'some-super-strong-string';

createJWTToken = payload => {
	return jwt.sign(payload, JWT_SECRET, {
		expiresIn: '7d',
		algorithm: 'HS256',
	});
};

getUserFromJWTToken = token => {
	try {
		const userPayload = jwt.verify(token, JWT_SECRET, {
			algorithms: ['HS256'],
		});

		return { username: userPayload.username };
	} catch (e) {
		console.error(e);
		return null;
	}
};

module.exports = { createJWTToken, getUserFromJWTToken };
