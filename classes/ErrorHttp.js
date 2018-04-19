class ErrorHttp {
	constructor (message, code = 400, error = null) {
		this.message = message;
		this.code = code;
		this.error = error;
	}
}

module.exports = ErrorHttp;
