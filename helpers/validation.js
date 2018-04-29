class Validate {
	static isJSON(value) {
	    try {
	        JSON.parse(value);
	    } catch (e) {
	        return false;
	    }
	    return true;
	}

	static alphaNumericSpace(value) {
		value = value.trim();
		const REGEX = /^[\w ]+$/;
		return REGEX.test(value);
	}

	static name(value) {
		value = value.trim();
		const REGEX = /^[\w\-.' ]+$/;
		return REGEX.test(value);
	}

	static numeric(value) {
		value = value.trim();
		const REGEX = /(^-?\d\d*\.\d*$)|(^-?\d\d*$)|(^-?\.\d\d*$)/;
		return REGEX.test(value);
	}

	static numbers(value) {
		value = value.trim();
		const REGEX = /^[0-9]+$/;
		return REGEX.test(value);
	}

	static alphabeticNumericPunct(value) {
		value = value.trim();
		const REGEX = /^[A-Za-z0-9 ()\/_\-.,!?@\"'`~#$%^&*]+$/;
		return REGEX.test(value);
	}

	static email(value) {
		value = value.trim();
		const REGEX = /^[\w.<>+\-]{1,}@[\w-]{1,}([\.][\w-]{1,}){1,2}$/;
		return REGEX.test(value);
	}

	static time(value) {
		value = value.trim();
		const REGEX = /^[0-2][0-9]:[0-5][0-9]$/;
		return REGEX.test(value);
	}
}

module.exports = Validate;
