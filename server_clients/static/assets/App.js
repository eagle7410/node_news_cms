import Cookies from './Cookies';

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

	/** --- Switch language ---**/
	let $langs = document.getElementsByClassName('lang');

	for (let $lang of $langs) {

		$lang.onclick = function (event) {
			event.preventDefault();
			Cookies.set('lang', event.target.dataset.val);
			location.reload();
		};
	}
}

document.addEventListener('DOMContentLoaded', documentReady);
