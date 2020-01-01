{

    const defaults = {
        el: 'jCaptcha',
        requiredValue: '*',
        resetOnError: true,
        focusOnError: true,
        clearOnSubmit: true,
        canvasWidth: 50,
        canvasHeight: 15,
        canvasFontSize: '15px',
        canvasFontFamily: 'Arial',
        canvasFillStyle: '#ddd',
        callback: null
    };

    let sumNum, num1, num2;

    function generateRandomNum() {

        num1 = Math.round(Math.random() * (8)) + 1;
        num2 = Math.round(Math.random() * (8)) + 1;

        sumNum = num1 + num2;
    }

    /**
     * @param {Object}
     * @param {Object}
     * @param {Boolean}
	*/
    function setCaptcha( $captcha, options, reset ) {

        if ( !reset ) {
            $captcha[0].insertAdjacentHTML('beforebegin', '<canvas class="jCaptchaText"></canvas>');
        }

        this.$captchaText = this.$captchaText || document.getElementsByClassName('jCaptchaText');
        this.$jCaptchaTextContext = this.$jCaptchaTextContext || this.$captchaText[0].getContext('2d');

        this.$captchaText[0].width = options.canvasWidth;
        this.$captchaText[0].height = options.canvasHeight;
        this.$jCaptchaTextContext.textBaseline = 'top';
        this.$jCaptchaTextContext.font = '' + options.canvasFontSize + ' ' + options.canvasFontFamily + '';
        this.$jCaptchaTextContext.textAlign = 'left';
        this.$jCaptchaTextContext.fillStyle = options.canvasFillStyle;

        this.$jCaptchaTextContext.fillText(num1 + ' + ' + num2 + ' ' + options.requiredValue + '', 0, 0);
    }

    /**
     * @param {Object}
	*/
    let jCaptcha = ( options = {} ) => {

        jCaptcha.prototype.options = Object.assign({}, defaults, options);
        jCaptcha.prototype._init();
    };

    jCaptcha.prototype = {

        _init() {

            this.$captchaInput = document.getElementsByClassName(this.options.el);

            generateRandomNum();
			setCaptcha.call(this, this.$captchaInput, this.options, false);
        },

        validate() {

            this.callbackReceived = this.callbackReceived || (typeof this.options.callback == 'function');

            if ( this.$captchaInput[0].value != sumNum ) {

                this.callbackReceived && this.options.callback('error', this.$captchaInput);

                (this.options.resetOnError === true) && this.reset();
                (this.options.focusOnError === true) && this.$captchaInput[0].focus();
                (this.options.clearOnSubmit === true) && (this.$captchaInput[0].value = '');

            } else {

                this.callbackReceived && this.options.callback('success', this.$captchaInput);
                (this.options.clearOnSubmit === true) && (this.$captchaInput[0].value = '');
            }
        },

        reset() {

			generateRandomNum();
			setCaptcha.call(this, this.$captchaInput, this.options, true);
        }
    };
}
