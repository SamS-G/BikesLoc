class Countdown {
    timer() {
        let countdownDate = new Date().getTime() + 1200000;
        this.x = setInterval(function () {
            let todayDate = new Date().getTime();
            let time = countdownDate - todayDate;
            let minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((time % (1000 * 60)) / 1000);
            $('#timer').html('<span>Durée de validité de votre réservation : </span>' + minutes + 'm' + seconds + 's');

            if (time < 0) {
                countdown.stopTimer();
                alert('Fin de validité de votre réservation');
                reservation.rentalCancellation();
            }
        }, 1000);
    }

    stopTimer() {
        clearInterval(this.x);
    }
}

