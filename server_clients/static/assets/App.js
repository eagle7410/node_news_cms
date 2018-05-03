import Cookies from './Cookies';
import LoginForm from './FormLogin';
import Api from './Api';
import Util from './Util'
Api.instance();

let documentReady = () => {
	/* ---- Login form --- */
	LoginForm.init();

	/* ---- Logout --- */
	Util.attachEventByClass('linkLogout', ev => {
		ev.preventDefault();
		Cookies.clear('token');
		location.reload();
	});

	/* ---- Drop down menu ---- */
	Util.attachEventByClass('dropdown-toggle', function () {
		let id = this.id;
		let $list = document.querySelector(`[aria-labelledby=${id}]`);
		let display = $list.style.display;
		$list.style.display = display ? '' : 'block';
	});

	/** --- Switch language ---**/
	Util.attachEventByClass('lang', event => {
		event.preventDefault();
		Cookies.set('lang', event.target.dataset.val);
		location.reload();
	});

}

document.addEventListener('DOMContentLoaded', documentReady);
