/** Extends Date class
/**
 * @class Date
 * @property numberHas2Symbols
 * @property toStringByFormat
 * @property isFuture
 * @property isFutureOrNowDay
 */

const extend = {
	toStringByFormat: function (format = 'd-m-y h:i') {
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
	},
	numberHas2Symbols: function (val) {
		return String(val.toString().length < 2 ? '0' + val : val);
	},
	isFuture: function () {
		return Date.now() < this.getTime();
	},
	isFutureOrNowDay: function () {
		if (this.isFuture()) {
			return true;
		}

		return (new Date()).toStringByFormat() === this.toStringByFormat();
	}
};

for (let prop in extend) {
	Date.prototype[prop] = extend[prop];
}


let documentReady = () => {
	/* ---- Drop down menu ---- */
	let $toggles = document.getElementsByClassName('dropdown-toggle');

	for (let $toggle of $toggles) {

		$toggle.onclick = function () {
			let id = this.id;
			let $list = document.querySelector(`[aria-labelledby=${id}]`);
			let display = $list.style.display;
			$list.style.display = display ? '' : 'block';
		};

	}
}


document.addEventListener('DOMContentLoaded', documentReady);
