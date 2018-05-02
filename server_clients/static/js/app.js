
let docReady = () => {
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


document.addEventListener('DOMContentLoaded', docReady);
