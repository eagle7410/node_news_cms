class DateCustom extends Date {
	toStringByFormat (format = 'd-m-y') {
		let that = this;
		let year = that.getFullYear();
		let month = that.numberHas2Symbols(that.getMonth() + 1);
		let day = that.numberHas2Symbols(that.getDate());
		let hours = that.numberHas2Symbols(that.getHours());
		let minutes = that.numberHas2Symbols(that.getMinutes());
		let seconds = that.numberHas2Symbols(that.getSeconds());

		return format.replace('d', day)
			.replace('m', month)
			.replace('y', year)
			.replace('h', hours)
			.replace('i', minutes)
			.replace('s', seconds);
	}
	byUtc () {
		return new DateCustom(this.getTime() + this.getTimezoneOffset() * 36e2);
	}
	numberHas2Symbols (val) {
		return String(val.toString().length < 2 ? '0' + val : val);
	}

	isFuture () {
		return Date.now() < this.getTime();
	}

	isFutureOrNowDay () {
		if (this.isFuture()) {
			return true;
		}

		return (new Date()).toStringByFormat('d-m-y') === this.toStringByFormat('d-m-y');
	}
}

module.exports = DateCustom;
