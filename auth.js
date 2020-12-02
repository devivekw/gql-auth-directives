const jwt = require('jsonwebtoken');

const JWT_SECRET = 'some-super-strong-string';

createJWTToken = payload => {
	return jwt.sign(payload, JWT_SECRET, {
		expiresIn: '7d',
	});
};

getUserFromJWTToken = token => {
	try {
		const userPayload = jwt.verify(token, JWT_SECRET);
		return { username: userPayload.username };
	} catch (e) {
		return null;
	}
};

module.exports = { createJWTToken, getUserFromJWTToken };
