import FormModal from './FormModal'
import Api from './Api';

class FormLogin extends FormModal {
	static params () {
		return {
			classShowButton: 'linkLogin',
			classCloseButton: 'loginClose',
			idModal  : 'loginForm',
			idForm   : 'singInForm',
			idErrors : 'loginErrors',
			idSubmit : 'loginTry'
		}
	}

	static afterInitOpenClose () {
		this.getById(this.params().idSubmit).onclick = (ev) => {
			let $form = this.getForm();

			$form.reportValidity();

			if (!this.isFormValid()) return false;

			Api.instance().login(this.getFormData())
				.then(success => {
					// TODO: clear
					console.log('success', success);
					if (success) return location.reload();
					this.errorShow();
				})
				.catch(err => this.errorShow());
		};

	}
}

module.exports = FormLogin;
