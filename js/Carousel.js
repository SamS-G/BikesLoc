class Carousel {
    /**
     *
     * @param {string} carousel_id
     * @param {string[]} items - Pictures links.
     */
    constructor(carousel_id, items) {
        this.items = items;
        this.root = $(carousel_id);
        this.maxIndex = this.items.length - 1;
        this.i = 0;
        this.changeSrc(this.items[this.i]);

        /**
         * - Events -
         */

        $(document).on('keydown', (e) =>
            this.keyDown(e)
        );

        $('#next').on('click', () =>
            this.next(),
            this.autoPlayStop()
        );

        $('#prev').on('click', () =>
            this.prev(),
            this.autoPlayStop()
        );

        $('#pause').on('click', () =>
            this.autoPlayStop()
        );

        $('#play').on('click', () =>
            this.autoPlay()
        );

        this.autoPlay()
    }

    /**
     * @param {string} newSrc - The new SRC item visible on the carousel -
     */
    changeSrc(newSrc) {
        this.root.attr('src', newSrc);
    }

    next() {
        if (this.i === this.maxIndex) {
            this.i = 0;
        } else {
            this.i++;
        }
        this.changeSrc(this.items[this.i]);
    }

    prev() {
        if (this.i === 0) {
            this.i = this.maxIndex;
        } else {
            this.i--;
        }
        this.changeSrc(this.items[this.i]);
    }

    autoPlay() {
        this.timerId = setInterval(() =>
            this.next(), 5000);
    }

    autoPlayStop() {
        clearInterval(this.timerId)
    }

    keyDown(e) {
        if (e.key === 'ArrowRight' || e.key === 'Right') {
            this.next()
        } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
            this.prev()
        }
    }
}