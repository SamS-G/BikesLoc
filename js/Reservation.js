class Reservation {
    constructor() {

        /**
         *Rent events
         */
        let reservation = $('#reservation');

        $('#rent').on('click', () => this.rentalWindowOpen()
        );

        reservation.on('click', () =>
            this.saveCanvas(),
        );

        reservation.on('click', () =>
            this.rentalValidation(),
        );

        /**
         * Cancel events
         */
        $('#cancel').on('click', () => this.rentalCancellation());
        $('#canceled').on('click', () =>
            this.rentalWindowClose(),
        );
    }

    rentalWindowOpen() {
        $('#reservation_form').css('display', 'block');
        $('#error-name, #error-firstname, #error-signature').css('display', 'none');

        $('#lastname').val(localStorage.getItem('lastname'));
        $('#firstname').val(localStorage.getItem('firstname'))
    }

    rentalWindowClose() {
        $('#reservation_form').css('display', 'none');
    };

    getStationName() {
        this.stationName = map.stationNameSend();
        sessionStorage.setItem('station', this.stationName);
        return sessionStorage.getItem('station', this.stationName);
    };

    getInputValue() {
        this.lastName = $('#lastname').val();
        this.firstName = $('#firstname').val();

        localStorage.setItem('lastname', this.lastName);
        localStorage.setItem('firstname', this.firstName);
    };

    saveCanvas() {
        if (canvas.clickNumber < 1) {
            $('#error-signature').css('display', 'block');
        } else {
            this.signature = ($('#canvas')[0]).toDataURL("image/png");
            sessionStorage.setItem('signature', this.signature);
            this.signatureReady = 1;
        }
    };

    rentalValidation() {
        canvas.clearCanvas();
        $('#error-firstname, #error-name').css('display', 'none');
        this.getInputValue();
        this.stationData = this.getStationName();
        this.firstName = localStorage.getItem('firstname');
        this.lastName = localStorage.getItem('lastname');

        if (this.lastName === '') {
            $('#error-firstname').css('display', 'block');
        } else if (this.firstName === '') {
            $('#error-name').css('display', 'block');
        } else if (this.signatureReady === 1) {
            $('#customer').html('<span>Nom de la réservation : </span>' + this.firstName + ', ' + this.lastName);
            $('#station').html('<span>Nom de la station : </span>' + this.stationData);
            $('#reservation_form').css('display', 'none');
            $('#rental_management').css('display', 'block');

            countdown.stopTimer();
            countdown.timer();
            this.getStationName();
            this.signatureReady = 0;
        }
    };

    rentalCancellation() {
        sessionStorage.removeItem('station');
        sessionStorage.removeItem('signature');
        countdown.stopTimer();
        $('#timer, #station').text('');
        $('#rental_management').css('display', 'none');
    }
}









