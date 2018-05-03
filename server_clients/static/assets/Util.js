class Util {
	static attachEventByClass (cssClass, handler) {
		for (let $btn of document.getElementsByClassName(cssClass)) {
			$btn.onclick = handler;
		}
	}

	static getById (id) {
		return document.getElementById(id);
	}
}

module.exports = Util;
