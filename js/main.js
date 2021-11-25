new Carousel(
    '#carousel_item',
    [
        'images/carousel-1.jpg',
        'images/carousel-2.jpg',
        'images/carousel-3.jpg',
        'images/carousel-4.jpg',
        'images/carousel-5.jpg'
    ]
);
const map = new Map(
    'city_map',
    [43.285320, 5.369056],
    13,
    'https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png',
    1,
    20);

const canvas = new Canvas('#canvas', '2d');

const reservation = new Reservation(
    'lastname', 'firstname'
);

const countdown = new Countdown();