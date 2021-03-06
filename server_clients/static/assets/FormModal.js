import Util from './Util'

class FormModal extends Util {
	static params () {
		throw new Error(`No implement params ${this.name}`);
	}

	static getForm () {
		return this.getById(this.params().idForm);
	}

	static getFormData () {
		let data = {};

		for (let $element of this.getForm().elements) {
			data[$element.name] = $element.value;
		}

		return data;
	}

	static isFormValid () {
		return this.getForm().checkValidity();
	}

	static getErrors () {
		return this.getById(this.params().idErrors);
	}

	static errorShow () {
		this.getErrors().style.display = 'block';
	}
	static errorHide () {
		this.getErrors().style.display = 'none';
	}

	static getModal () {
		return this.getById(this.params().idModal);
	}

	static attachEventShow () {
		this.attachEventByClass(this.params().classShowButton, (ev) => {
			ev.preventDefault();
			this.getModal().style.display = 'block';
		})
	}

	static attachEventClose () {
		this.attachEventByClass(this.params().classCloseButton, (ev) => {
			ev.preventDefault();
			this.getModal().style.display = 'none';
		})
	}

	static init () {
		if (this.getForm() === null) {
			return false;
		}

		this.errorHide();
		this.attachEventClose();
		this.attachEventShow();
		this.afterInitOpenClose();
	}

	static afterInitOpenClose () {}
}

module.exports = FormModal;
