const maskCodes = {
	notFound : 404
};

class ErrorHttp {
	constructor (message, code = 400, error = null) {
		this.message = message;
		this.code = code;
		this.error = error;
	}

	static forbidden(message = 'Access denied', error = null, code = 403) {
		return new ErrorHttp({code, message}, maskCodes.notFound, error);
	}

	static notFound(message = 'Not found', error = null, code = 404) {
		return new ErrorHttp({code, message}, maskCodes.notFound, error);
	}

	static unauthorized (message = 'Bad authorized', error = null, code = 401) {
		return new ErrorHttp({code, message}, maskCodes.notFound, error);
	}
}

module.exports = ErrorHttp;
