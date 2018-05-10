/**
 * This model validation error.
 */
class ErrorModelValidation extends Error {
	constructor (...agrs) {
		super(...agrs);
		this.name = 'ValidationError';
	}
}

module.exports = ErrorModelValidation;
